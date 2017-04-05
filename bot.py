import json 
import requests
import time
from datetime import datetime, timedelta
import os, sys
from django.utils import timezone
import re
from enum import Enum
from decimal import Decimal
import pytz

# proj_path = "/path/to/my/project/"
# # This is so Django knows where to find stuff.
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "cronWebsite.settings")
sys.path.append(os.path.join(os.path.dirname(__file__), 'cronWebsite'))

# # This is so my local_settings.py gets loaded.
os.chdir(os.path.join(os.path.dirname(__file__), 'cronWebsite'))

# # This is so models get loaded.
from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
from main_site.models import Participante, Log_PesoBot, Log_RefeicaoBot


# Token antigo do elevebot
# TOKEN = "326058249:AAF7nEaSHKvdXYWRY4Y56IFw7cF0HHKBdoo"
# TOKEN NOVO
# TOKEN = "371540343:AAFZcFzR8_OzSi3w5mpo-eLMOMCXsiKUV3s"
TOKEN = "326058249:AAF7nEaSHKvdXYWRY4Y56IFw7cF0HHKBdoo"
URL = "https://api.telegram.org/bot{}/".format(TOKEN)

# VARIAVEIS QUE VAO APARECER COMO OPÇOES NO TECLADO
PESO_TEXTO = "Medida de Peso"
REFEICAO_TEXTO = "Adicionar Refeição"

# OPCOES DE REFEICOES
CAFE_DA_MANHA = "Café da manhã"
LANCHE_MANHA = "Lanche da manhã"
ALMOCO = "Almoço"
LANCHE_TARDE = "Lanche da tarde"
JANTAR= "Jantar"
LANCHE_NOITE = "Lanche da noite"

LISTA_REFEICOES = [CAFE_DA_MANHA, LANCHE_MANHA, ALMOCO, LANCHE_TARDE, JANTAR, LANCHE_NOITE]

# GAMBIARRA PRA SABER QUE TIPO DE MENSAGEM A GNT ESTA LIDANDO
# 1 - VAI MANDAR O PESO
# 2 - VAI MANDAR AS REFEICOES
# 3 -  MENSAGEM PARA AGRADECER A SUBMISSAO
MESSAGE_TYPE = 0


# Lista de usuarios ja vistos para nao precisar ficar checando no banco
# se ja registrou o participante
LISTA_PARTICIPANTES = []
CHAT_IDS_THREADS_CRIADAS = []


class EMessageType(Enum):
    REFEICAO = 0
    PESO = 1
    ERRO = 2
    SUCESSO = 3


class ChatState:

    def __init__(self, last_id_message = None, message_type=None, refeicao_type=None, refeicao_dia=None):
        self.last_id_message = last_id_message
        self.message_type = message_type
        self.refeicao_type = refeicao_type
        self.refeicao_dia = refeicao_dia

    def __str__(self):
        response = "{ " + "message_type : " + str(self.message_type) + ", refeicao_type : " + str(self.refeicao_type) + ", refeicao_dia : " + str(self.refeicao_dia) + " }"
        return response


CHATS_DICTIONARY = {}

def get_url(url):
    print("accessed API")
    response = requests.get(url)
    print("got response")
    content = response.content.decode("utf8")
    print(content)
    return content


def get_json_from_url(url):
    content = get_url(url)
    js = json.loads(content)
    return js

# Usa o offset para nao receber mensagens mais antigas que a do ID do offset
# Assim o get_updates nao traz todas as mensagens da conversa e apenas as mais novas
def get_updates(offset=None):
    url = URL + "getUpdates?timeout=3000"
    if offset:
        url += "&offset={}".format(offset)
    js = get_json_from_url(url)
    return js

def save_peso_to_db(updates, participante, peso):
    print("Pegando o peso")
    # Pegando a ultima mensagem com o chat_id
    (msg, chat_id, date) = get_last_message_info(updates)
    print(msg)
    
    # Fazendo a conversao do tempo em UTC para o de Recife antes de salvar
    local_tz =  pytz.timezone("America/Recife")
    utc_dt = datetime.utcfromtimestamp(date).replace(tzinfo=pytz.utc)
    local_dt = local_tz.normalize(utc_dt.astimezone(local_tz)).strftime('%Y-%m-%d %H:%M:%S')

    # data = datetime.fromtimestamp(date).strftime('%Y-%m-%d %H:%M:%S')
    # Log_PesoBot.objects.create(peso=peso, data=data, participante=participante)
    try:
        log = Log_PesoBot.objects.get(participante=participante)
        peso = float(peso)
        log.peso = peso
        log.data = local_dt
        log.save()
    except:
        Log_PesoBot.objects.create(participante=participante, peso=peso, data=local_dt)


def save_refeicao_to_db(updates, participante, tipo_refeicao):
    print("Pegando a refeicao")
    # Pegando a ultima mensagem com o chat_id
    (msg, chat_id, date) = get_last_message_info(updates)
    print(msg)

    # Se tiver "Ontem" na mensagem a gnt salva como no dia anterior
    if "ontem" in msg.lower():
        day_time = datetime.fromtimestamp(date) - timedelta(days=1)
    else:
        day_time = datetime.fromtimestamp(date)

    data = day_time.strftime('%Y-%m-%d %H:%M:%S')
    Log_RefeicaoBot.objects.create(descricao_refeicao=msg, data=data, participante=participante, refeicao_nome=tipo_refeicao)

# Add a function that calculates the highest ID of all the updates we receive from getUpdates. 
# Quando for ver a ultima mensagem que recebeu do getUpdates ele pega e salva no banco
def get_last_update_id(updates):
    update_ids = []
    for update in updates["result"]:
        update_ids.append(int(update["update_id"]))

    return max(update_ids)

def get_last_message_info(updates):
    num_updates = len(updates["result"])
    last_update = num_updates - 1
    text = updates["result"][last_update]["message"]["text"]
    chat_id = updates["result"][last_update]["message"]["chat"]["id"]
    date = updates["result"][last_update]["message"]["date"]
    return (text, chat_id, date)

# def create_message_to_send(text):
#     message = ""
#     if "oi" in text.lower():
#         message = "Boa noite, mô fi!"
#     else:
#         message = text

#     return message


def build_keyboard():
    keyboard = [[PESO_TEXTO, REFEICAO_TEXTO]]
    reply_markup = {"keyboard":keyboard, "one_time_keyboard": True}
    return json.dumps(reply_markup)

def build_keyboard_dia():
    keyboard = [["Hoje", "Ontem"]]
    reply_markup = {"keyboard":keyboard, "one_time_keyboard": True}
    return json.dumps(reply_markup)

def build_refeicoes_keyboard():
    keyboard = [[CAFE_DA_MANHA, LANCHE_MANHA, ALMOCO], [LANCHE_TARDE, JANTAR, LANCHE_NOITE]]
    reply_markup = {"keyboard":keyboard, "one_time_keyboard": True}
    return json.dumps(reply_markup)

def build_inlinekeyboard():
    keyboard = [[{"text":CAFE_DA_MANHA, "callback_data": CAFE_DA_MANHA}, {"text":LANCHE_MANHA, "callback_data": LANCHE_MANHA},
     {"text":ALMOCO, "callback_data": ALMOCO}], 
     [{"text":LANCHE_TARDE, "callback_data": LANCHE_TARDE}, {"text":JANTAR, "callback_data": JANTAR}, 
     {"text":LANCHE_NOITE, "callback_data": LANCHE_NOITE}]]
    reply_markup = {"keyboard":keyboard, "one_time_keyboard": True}
    return json.dumps(reply_markup)


def send_message(text, chat_id, reply_markup=None):
    # text = urllib.parse.quote_plus(text)
    # text = create_message_to_send(text)
    url = URL + "sendMessage?text={}&chat_id={}&parse_mode=Markdown".format(text, chat_id)
    if reply_markup:
        url += "&reply_markup={}".format(reply_markup)
    get_url(url)

def receive_chat(updates, text, chat, participante, nome_participante):
    MESSAGE_TYPE = 0

    if chat in CHATS_DICTIONARY:
        chatState = CHATS_DICTIONARY[chat]
    else:
        # criando um chatState no dicionario com key sendo o chat_id e dps vou colocar infos sobre o chat
        CHATS_DICTIONARY[chat] = ChatState(message_type=0)
        chatState = CHATS_DICTIONARY[chat]

    print("ESTAMOS NA CONVERSA")
    print(chat)
    print(CHATS_DICTIONARY[chat])
    print(chatState.message_type)
    # AQUI EU LI O QUE O USUARIO MANDOU E AI EU VEJO O QUE RESPONDO OU FAÇO NO BANCO
    if text == PESO_TEXTO:
        send_message("Ok! Pode inserir seu peso.", chat)
        MESSAGE_TYPE = 1
        chatState.message_type = MESSAGE_TYPE
    
    # Se tiver avisado q vai adicionar um peso e mensagem vier com algum decimal entao pegamos o peso
    # SE O ESTADO DA CONVERSA QUE ELE ESTA VENDO FOR O DE PESO ELE VE SE RECEBEU PESO
    elif chatState.message_type == 1 and (len(re.findall("\d+\.\d+", text )) > 0 or len(re.findall("\d+", text )) == 1 or len(re.findall("\d+\,\d+", text )) > 0):
        rgA = re.findall("\d+\.\d+", text )
        rgB = re.findall("\d+", text )
        rgC = re.findall("\d+\,\d+", text )
        
        if len(rgA) > 0:
            save_peso_to_db(updates, participante, rgA[0])
        elif len(rgB) == 1:
            save_peso_to_db(updates, participante, rgB[0])
        elif len(rgC) > 0:
            # Pra dps converter pra decimal
            rg = rgC[0].replace(",", ".")
            save_peso_to_db(updates, participante, rg)
        MESSAGE_TYPE = 3
        chatState.message_type = MESSAGE_TYPE
    

    # INTERACOES COM AS REFEICOES
    # elif text == REFEICAO_TEXTO:
    #     send_message("Agora insira o tipo da refeição.", chat, build_refeicoes_keyboard)
    #     MESSAGE_TYPE = 2
    # elif text in LISTA_REFEICOES:
    #     send_message("Ok! Insira em uma única mensagem o que você comeu.", chat)
    #     MESSAGE_TYPE = 2
    # elif MESSAGE_TYPE == 2:
    #     save_refeicao_to_db(updates, participante)
    #     MESSAGE_TYPE = 3
    elif text == REFEICAO_TEXTO:
        keyboard = build_refeicoes_keyboard()
        send_message("Agora selecione o tipo de refeição:", chat, keyboard)
        MESSAGE_TYPE = 2
        chatState.message_type = MESSAGE_TYPE
    elif (chatState.message_type == 2) and (text in LISTA_REFEICOES):
        send_message("Ok! Insira em uma única mensagem o que você comeu.", chat)
        MESSAGE_TYPE = 2
        chatState.message_type = MESSAGE_TYPE
        chatState.refeicao_type = text
    # Se ja tiver o tipo de refeicao entao eh o ultimo passo e salvamos a refeicao no banco
    elif (chatState.message_type == 2) and (chatState.refeicao_type is not None):
        save_refeicao_to_db(updates, participante, chatState.refeicao_type)
        MESSAGE_TYPE = 3
        chatState.message_type = MESSAGE_TYPE
    # Se tiver no fluxo da refeicao e o texto nao for o da lista nem ja tiver o refeicao_type
    # eh pq se adiantaram no fluxo e ja escreveram a refeicao
    # Entao peço para seguir com o fluxo
    elif (chatState.message_type == 2):
        keyboard = build_refeicoes_keyboard()
        mensagem = "Desculpe, não entendi!\nPor favor, selecione o tipo de refeição antes de digitar :)"
        send_message(mensagem, chat, keyboard)
        MESSAGE_TYPE = 2
        chatState.message_type = MESSAGE_TYPE

    # OUTRAS INTERACOES
    # Se so tiver Oi na mensagem entao eh a primeira interacao
    if ("oi" in text.lower()) and (len(text) == 2):
        keyboard = build_keyboard()
        msg =  "Olá, "+nome_participante+"! Selecione o tipo de registro."
        send_message(msg, chat, keyboard)
        MESSAGE_TYPE = 0
        chatState.message_type = MESSAGE_TYPE
    elif chatState.message_type == 3:
        keyboard = build_keyboard()
        send_message("Seu registro foi feito com sucesso!", chat, keyboard)
        MESSAGE_TYPE = 0

        # Limpando o chatState
        chatState.message_type = MESSAGE_TYPE
        chatState.refeicao_type = None
    elif chatState.message_type == 0:
        msg =  "Desculpe, "+nome_participante+". Para inserir um novo registro, digite 'oi'."
        send_message(msg, chat)
    elif text == "/start":
        send_message("Olá! Para inserir um novo registro, digite 'oi'.", chat)
        MESSAGE_TYPE = 0
        chatState.message_type = MESSAGE_TYPE
    # elif text.startswith("/"):
    #     continue

def handle_updates(updates):
    global MESSAGE_TYPE
    lista_threads_chats = []

    for update in updates["result"]:
        try:
            text = update["message"]["text"]
        except:
            text = "Recebeu algo q nao era texto como um GIF"
        
        # PEGANDO SE VIER MESSAGE OU EDITED_MESSAGE
        try:
            chat = update["message"]["chat"]["id"]
            nome_participante = update["message"]["chat"]["first_name"]
        except:
            chat = update["edited_message"]["chat"]["id"]
            nome_participante = update["edited_message"]["chat"]["first_name"]

        # Para cada mensagem nova que recebeu eu vou ver o chat para saber o id do participante conversando
        # Para cada participante diferente eu teria que cirar um processo para ele lidar com as msgs do mesmo
        try:
            participante = Participante.objects.get(telegram_chat_id=chat)
        except Exception as e:
            participante = Participante.objects.create(telegram_chat_id=chat, nome=nome_participante)

        # MANTENDO OS ESTADOS DE CADA CONVERSA


        # # CRIAR UM THREAD PARA CADA CHAT COM ID DIFERENTE
        # global CHAT_IDS_THREADS_CRIADAS
        # if chat not in CHAT_IDS_THREADS_CRIADAS:
        #     thread = chatThread(, chat, )

        receive_chat(updates, text, chat, participante, nome_participante)


def main():
    last_update_id = None
    while True:
        updates = get_updates(last_update_id)
        print("getting updates")
        if len(updates["result"]) > 0:
            last_update_id = get_last_update_id(updates) + 1
            handle_updates(updates)
        time.sleep(0.5)


if __name__ == '__main__':
    main()
