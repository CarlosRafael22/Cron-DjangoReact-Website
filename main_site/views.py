from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse


from .models import (Ingrediente, Receita, Passo_da_Receita, Parte_da_Receita, Foto_Receita, Perfil, Paciente, Coach, Ordem_Passo_na_Parte_Receita, Chat, Grupo, Foto_Perfil)
from django.contrib.auth.models import User
from .serializers import (IngredienteSerializer, ReceitaSerializer, Passo_da_ReceitaSerializer, Parte_da_ReceitaSerializer, Foto_ReceitaSerializer, 
	UserSerializer, PerfilSerializer, PacienteSerializer, CoachSerializer, Ordem_Passo_na_Parte_ReceitaSerializer, ChatSerializer, GrupoSerializer,
	Foto_PerfilSerializer)

# IMPORTANDO O NOVO SERIALIZER DO CustomObtainAuthToken
from .serializers import AuthCustomTokenSerializer
from rest_framework import parsers, renderers

from rest_framework import generics
from rest_framework.decorators import parser_classes, renderer_classes
from rest_framework.parsers import MultiPartParser, FormParser, FileUploadParser, JSONParser
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView

import json

class IngredienteList(generics.ListCreateAPIView):
	queryset = Ingrediente.objects.all()
	serializer_class = IngredienteSerializer

# format=None -> esse parametro eh opcional para dizer qual o formato que queremos que retorne. Ex: .json
@api_view(['GET', 'POST'])
def ingrediente_list(request, format=None):

	if request.method == 'GET':
		ingredientes = Ingrediente.objects.all()
		serializer = IngredienteSerializer(ingredientes, many=True)
		return Response(serializer.data)

	elif request.method == 'POST':
		import pdb;
		pdb.set_trace();
		serializer = IngredienteSerializer(data=request.data)
		if serializer.is_valid():
			# Salvando o objeto no banco
			serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class IngredienteDetail(generics.RetrieveUpdateDestroyAPIView):
	queryset = Ingrediente.objects.all()
	serializer_class = IngredienteSerializer
######################################################################

class Passo_da_ReceitaList(generics.ListCreateAPIView):
	queryset = Passo_da_Receita.objects.all()
	serializer_class = Passo_da_ReceitaSerializer

class Passo_da_ReceitaDetail(generics.RetrieveUpdateDestroyAPIView):
	queryset = Passo_da_Receita.objects.all()
	serializer_class = Passo_da_ReceitaSerializer
######################################################################

class Ordem_Passo_na_Parte_ReceitaList(generics.ListCreateAPIView):
	queryset = Ordem_Passo_na_Parte_Receita.objects.all()
	serializer_class = Ordem_Passo_na_Parte_ReceitaSerializer

class Ordem_Passo_na_Parte_ReceitaDetail(generics.RetrieveUpdateDestroyAPIView):
	queryset = Ordem_Passo_na_Parte_Receita.objects.all()
	serializer_class = Ordem_Passo_na_Parte_ReceitaSerializer
######################################################################


class Parte_da_ReceitaList(generics.ListCreateAPIView):
	queryset = Parte_da_Receita.objects.all()
	serializer_class = Parte_da_ReceitaSerializer

#format=None -> esse parametro eh opcional para dizer qual o formato que queremos que retorne. Ex: .json
@api_view(['GET', 'POST'])
def parte_receita_list(request, format=None):

	if request.method == 'GET':
		partes_receita = Parte_da_Receita.objects.all()
		serializer = Parte_da_ReceitaSerializer(partes_receita, many=True)
		return Response(serializer.data)

	elif request.method == 'POST':
		# import pdb;
		# pdb.set_trace();
		serializer = Parte_da_ReceitaSerializer(data=request.data)
		if serializer.is_valid():
			# Salvando o objeto no banco
			serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class Parte_da_ReceitaDetail(generics.RetrieveUpdateDestroyAPIView):
	queryset = Parte_da_Receita.objects.all()
	serializer_class = Parte_da_ReceitaSerializer
#######################################################################

class ReceitaList(generics.ListCreateAPIView):
	queryset = Receita.objects.all()
	serializer_class = ReceitaSerializer

# @method_decorator(csrf_exempt)
@api_view(['GET', 'POST'])
@parser_classes((JSONParser, FormParser, MultiPartParser,))
def receita_list(request, format=None):

	if request.method == 'GET':
		# import pdb;
		# pdb.set_trace();
		receitas = Receita.objects.all()
		serializer = ReceitaSerializer(receitas, many=True)
		return Response(serializer.data)

	elif request.method == 'POST':
		# import pdb;
		# pdb.set_trace();
		serializer = ReceitaSerializer(data=request.data)
		if serializer.is_valid():
			# Salvando o objeto no banco
			serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ReceitaDetail(generics.RetrieveUpdateDestroyAPIView):
	queryset = Receita.objects.all()
	serializer_class = ReceitaSerializer



@api_view(['GET', 'POST'])
@parser_classes((JSONParser,))
def get_receitas_ids(request, format=None):

	if request.method == 'GET':

		receitas_ids = []
		todas_receitas = Receita.objects.all()

		for receita in todas_receitas:
			receitas_ids.append(receita.id)

		return Response(receitas_ids, status=status.HTTP_200_OK)

	elif request.method == 'POST':

		# Vamos receber as ids das receitas que o cliente quer pegar
		ids_receitas_desejadas = request.data['receitas_ids']

		# Lista em que iremos retornar as receitas desejadas
		receitas_retornadas = []

		for receita_id in ids_receitas_desejadas:
			receitas_retornadas.append(Receita.objects.get(id=receita_id))

		serializer = ReceitaSerializer(receitas_retornadas, many=True)

		return Response(serializer.data, status=status.HTTP_200_OK)

########################################################################

class Foto_ReceitaList(generics.ListCreateAPIView):
	queryset = Foto_Receita.objects.all()
	serializer_class = Foto_ReceitaSerializer

@api_view(['GET', 'POST'])
@parser_classes((FormParser, MultiPartParser,FileUploadParser,))
def foto_list(request, format=None):

	if request.method == 'GET':
		# import pdb;
		# pdb.set_trace();
		fotos_receita = Foto_Receita.objects.all()
		serializer = Foto_ReceitaSerializer(fotos_receita, many=True)
		return Response(serializer.data)

	elif request.method == 'POST':
		# import pdb;
		# pdb.set_trace();
		serializer = Foto_ReceitaSerializer(data=request.data)
		if serializer.is_valid():
			# Salvando o objeto no banco
			serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class Foto_ReceitaDetail(generics.RetrieveUpdateDestroyAPIView):
	queryset = Foto_Receita.objects.all()
	serializer_class = Foto_ReceitaSerializer

########################################################################

#
#
# VIEWS DOS MODELS DE USUARIO
#
#
########################################################################
class UserList(generics.ListCreateAPIView):
	# Tirei o Permission pq senao dava Forbiden ao tentar criar User fazendo um POST pra a url 
	#permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
	queryset = User.objects.all()
	serializer_class = UserSerializer

	def create(self, request):
		
		serializer = UserSerializer(data=self.request.data)
		if serializer.is_valid(raise_exception=True):
			#Pegou o user que acabou de ser salvo
			user = serializer.save()

		token, created = Token.objects.get_or_create(user=user)
		#token = Token.objects.get(key=response.data['token'])
		
		# Tem que serializer o user pq senao vai dar:
		# TypeError at /api-token-auth/↵<User: rani> is not JSON serializable
		# ao fazer a requisicao
		print(token)
		# import pdb;
		# pdb.set_trace();
		user_serialized = UserSerializer(token.user)

		# Nao vou dar todas as informacoes do User para o front-end!
		# Aqui eu limito o que vou passar
		user = {"username": user_serialized.data['username'], "email": user_serialized.data['email'],
		"first_name": user_serialized.data['first_name'], "last_name": user_serialized.data['last_name'],
		"id": user_serialized.data['id']}
		headers = self.get_success_headers(serializer.data)
		return Response({'token': token.key, 'user': user}, status=status.HTTP_201_CREATED, headers=headers)

	# Vou modificar o list tb pra mandar so algumas infos sobre o usuario e nao tudo
	def list(self, request):
		
		queryset = User.objects.all()
		# Codigo padrao que tava na classe: https://github.com/tomchristie/django-rest-framework/blob/master/rest_framework/mixins.py
		page = self.paginate_queryset(queryset)
		if page is not None:
			serializer = self.get_serializer(page, many=True)
			return self.get_paginated_response(serializer.data)

		# Vou checar e ver se a request ta vindo do browser ou do Ajax
		# Se vinher do Browser o content_type = text/plain e ai dou o Response padrao pra ficar do mesmo jeito
		# Se vinher de uma request Ajax o content_type = application/json e assim indica que to acessando pelo front-end
		# com isso eu limito o Response para mandar so alguns dados dos Users
		# import pdb;
		# pdb.set_trace();

		if request.content_type == 'text/plain':
			serializer = self.get_serializer(queryset, many=True)
			return Response(serializer.data)
		elif request.content_type == 'application/json':
			# Se vier do Ajax eu mando um context para o serializer para que dentro dele 
			# ele de um overide no to_representation e mande a resposta de outro jeito
			serializer = UserSerializer(queryset, many=True, context={"limited_representation" : True})
			return Response(serializer.data)



class UserDetail(generics.RetrieveUpdateDestroyAPIView):
	# permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
	queryset = User.objects.all()
	serializer_class = UserSerializer

########################################################################

class PerfilList(generics.ListCreateAPIView):
	queryset = Perfil.objects.all()
	serializer_class = PerfilSerializer

	# Vou modificar o list tb pra mandar so algumas infos sobre o usuario e nao tudo
	def list(self, request):
		
		queryset = Perfil.objects.all()
		# Codigo padrao que tava na classe: https://github.com/tomchristie/django-rest-framework/blob/master/rest_framework/mixins.py
		page = self.paginate_queryset(queryset)
		if page is not None:
			serializer = self.get_serializer(page, many=True)
			return self.get_paginated_response(serializer.data)

		# Vou checar e ver se a request ta vindo do browser ou do Ajax
		# Se vinher do Browser o content_type = text/plain e ai dou o Response padrao pra ficar do mesmo jeito
		# Se vinher de uma request Ajax o content_type = application/json e assim indica que to acessando pelo front-end
		# com isso eu limito o Response para mandar so alguns dados dos Users
		# import pdb;
		# pdb.set_trace();

		if request.content_type == 'text/plain':
			serializer = self.get_serializer(queryset, many=True)
			return Response(serializer.data)
		elif request.content_type == 'application/json':
			# Se vier do Ajax eu mando um context para o serializer para que dentro dele 
			# ele de um overide no to_representation e mande a resposta de outro jeito
			serializer = PerfilSerializer(queryset, many=True, context={"limited_representation" : True})
			return Response(serializer.data)

class PerfilDetail(generics.RetrieveUpdateDestroyAPIView):
	queryset = Perfil.objects.all()
	serializer_class = PerfilSerializer


#########################################################################

class Foto_PerfilList(generics.ListCreateAPIView):
	queryset = Foto_Perfil.objects.all()
	serializer_class = Foto_PerfilSerializer

class Foto_PerfilDetail(generics.RetrieveUpdateDestroyAPIView):
	queryset = Foto_Perfil.objects.all()
	serializer_class = Foto_PerfilSerializer


class JPEGRenderer(renderers.BaseRenderer):
    media_type = 'image/jpeg'
    format = 'jpg'
    charset = 'UTF-8'
    render_style = 'binary'

    def render(self, data, media_type=None, renderer_context=None):
        return data

@api_view(['GET'])
#@renderer_classes((JPEGRenderer,))
#@parser_classes((FormParser, MultiPartParser,FileUploadParser,))
def get_foto_perfil(request, perfil_username, format=None):

	if request.method == 'GET':

		perfil = Perfil.objects.get(user__username=perfil_username)

		foto_perfil = perfil.foto_perfil

		#  USA O CONTEXT PARA QUE ELE VOLTE COM A URL COMPLETA DA FOTO
		#  http://masnun.com/2015/10/26/django-rest-framework-displaying-full-url-for-imagefield-or-filefield.html
		foto_serialized = Foto_PerfilSerializer(foto_perfil, context={"request": request})

		#return HttpResponse(foto_serialized.data, content_type="image/jpg")
		#return Response(foto_serialized.data['foto'], content_type="image/jpg")
		# So vou mostrar qual a URL onde a foto esta, o <img src> pode acessar essa url diretamente e pegar a imagem
		return Response(foto_serialized.data['foto'], status=status.HTTP_200_OK)




########################################################################

class PacienteList(generics.ListCreateAPIView):
	queryset = Paciente.objects.all()
	serializer_class = PacienteSerializer

	def create(self, request):

		import pdb;
		pdb.set_trace();
		# Criando o paciente na mao com o metodo definido no model
		# dps serializando para mandar o Response com o paciente como JSON
		paciente = Paciente.objects.create_pessoa(username=self.request.data['username'], email=self.request.data['email'], password=self.request.data['password'])

		# Pegando separado e retornando a Response como retorna no UserList() para nao precisar modificar no front-end
		# Peguei o Objeto 
		user = paciente.perfil.user
		# Pegando token
		token, created = Token.objects.get_or_create(user=user)
		# PEGA O TOKEN LOGO AGORA PQ ELE SO ACEITA OBJECT E USER EH UM OBJECT NESSE MOMENTO
		# QD SERIALIZARMOS ELE VAI VIRAR UM RETURNDICT, FAZENDO COM Q NAO POSSAMOS PEGAR O TOKEN ASSIM

		# MAS PARA MANDAR PRO RESPONSE TEM QUE SERIALIZAAR, SEMPREEE!!!!!
		user_serialized = UserSerializer(user)
		user = user_serialized.data
		print(user)

		
		# Serializando o paciente para mandar o JSON e nao object
		# e pegando os dados, o JSON e nao o objeto PacienteSerializer
		paciente_serializer = PacienteSerializer(paciente)
		paciente = paciente_serializer.data
		print(paciente)

		if hasattr(user, 'perfil'):
			if hasattr(user.perfil, 'paciente'):
				user = {"username": user_serialized.data['username'], "email": user_serialized.data['email'],
				"first_name": user_serialized.data['first_name'], "last_name": user_serialized.data['last_name'],
				"id": user_serialized.data['id'], "isCoach": False}
		#return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response({'token': token.key, 'user': user, 'paciente': paciente}, status=status.HTTP_201_CREATED)

	# Vou modificar o list tb pra mandar so algumas infos sobre o usuario e nao tudo
	def list(self, request):
		
		queryset = Paciente.objects.all()
		# Codigo padrao que tava na classe: https://github.com/tomchristie/django-rest-framework/blob/master/rest_framework/mixins.py
		page = self.paginate_queryset(queryset)
		if page is not None:
			serializer = self.get_serializer(page, many=True)
			return self.get_paginated_response(serializer.data)

		# Vou checar e ver se a request ta vindo do browser ou do Ajax
		# Se vinher do Browser o content_type = text/plain e ai dou o Response padrao pra ficar do mesmo jeito
		# Se vinher de uma request Ajax o content_type = application/json e assim indica que to acessando pelo front-end
		# com isso eu limito o Response para mandar so alguns dados dos Users
		# import pdb;
		# pdb.set_trace();

		if request.content_type == 'text/plain':
			serializer = self.get_serializer(queryset, many=True)
			return Response(serializer.data)
		elif request.content_type == 'application/json':
			# Se vier do Ajax eu mando um context para o serializer para que dentro dele 
			# ele de um overide no to_representation e mande a resposta de outro jeito
			serializer = PacienteSerializer(queryset, many=True, context={"limited_representation" : True})
			return Response(serializer.data)



class PacienteDetail(generics.RetrieveUpdateDestroyAPIView):
	queryset = Paciente.objects.all()
	serializer_class = PacienteSerializer

	# Vou modificar o list tb pra mandar so algumas infos sobre o usuario e nao tudo
	def retrieve(self, request, *args, **kwargs):
		# import pdb;
		# pdb.set_trace();
		
		instance = self.get_object()

		if request.content_type == 'text/plain':
			serializer = self.get_serializer(instance)
			return Response(serializer.data)
		elif request.content_type == 'application/json':
			# Se vier do Ajax eu mando um context para o serializer para que dentro dele 
			# ele de um overide no to_representation e mande a resposta de outro jeito
			serializer = PacienteSerializer(instance, context={"limited_representation" : True})
			return Response(serializer.data)

########################################################################

class CoachList(generics.ListCreateAPIView):
	queryset = Coach.objects.all()
	serializer_class = CoachSerializer

	def create(self, request):

		# import pdb;
		# pdb.set_trace();
		# Criando o paciente na mao com o metodo definido no model
		# dps serializando para mandar o Response com o paciente como JSON
		coach = Coach.objects.create_pessoa(username=self.request.data['username'], email=self.request.data['email'], password=self.request.data['password'])
		# Pegando separado e retornando a Response como retorna no UserList() para nao precisar modificar no front-end
		# Peguei o Objeto 
		user = coach.perfil.user
		# Pegando token
		token, created = Token.objects.get_or_create(user=user)
		# PEGA O TOKEN LOGO AGORA PQ ELE SO ACEITA OBJECT E USER EH UM OBJECT NESSE MOMENTO
		# QD SERIALIZARMOS ELE VAI VIRAR UM RETURNDICT, FAZENDO COM Q NAO POSSAMOS PEGAR O TOKEN ASSIM

		# # MAS PARA MANDAR PRO RESPONSE TEM QUE SERIALIZAAR, SEMPREEE!!!!!
		user_serialized = UserSerializer(user)
		# user = user_serialized.data
		# print(user)

		
		# Serializando o paciente para mandar o JSON e nao object
		# e pegando os dados, o JSON e nao o objeto PacienteSerializer
		coach_serializer = CoachSerializer(coach)
		coach = coach_serializer.data
		print(coach)

		# NA VERDADE, AGORA EU TENHO QUE PEGAR O OBJ PARA EXTRAIR DADOS DELE E DPS MANDAR COMO DICT COMO FACO EMBAIXO:

		# Limitando como vai retornar para o front-end
		# Vou botar se ele eh coach para dps poder pegar os pac_supervisionados no front-end
		# se tem perfil associado olha, senao retorna normal
		if hasattr(user, 'perfil'):
			if hasattr(user.perfil, 'coach'):
				user = {"username": user_serialized.data['username'], "email": user_serialized.data['email'],
				"first_name": user_serialized.data['first_name'], "last_name": user_serialized.data['last_name'],
				"id": user_serialized.data['id'], "isCoach": True, "coachId": user.perfil.coach.id}
		print(user)
		#return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response({'token': token.key, 'user': user, 'coach': coach}, status=status.HTTP_201_CREATED)


	# Vou modificar o list tb pra mandar so algumas infos sobre o usuario e nao tudo
	def list(self, request):
		
		queryset = Coach.objects.all()
		# Codigo padrao que tava na classe: https://github.com/tomchristie/django-rest-framework/blob/master/rest_framework/mixins.py
		page = self.paginate_queryset(queryset)
		if page is not None:
			serializer = self.get_serializer(page, many=True)
			return self.get_paginated_response(serializer.data)

		# Vou checar e ver se a request ta vindo do browser ou do Ajax
		# Se vinher do Browser o content_type = text/plain e ai dou o Response padrao pra ficar do mesmo jeito
		# Se vinher de uma request Ajax o content_type = application/json e assim indica que to acessando pelo front-end
		# com isso eu limito o Response para mandar so alguns dados dos Users
		# import pdb;
		# pdb.set_trace();

		if request.content_type == 'text/plain':
			serializer = self.get_serializer(queryset, many=True)
			return Response(serializer.data)
		elif request.content_type == 'application/json':
			# Se vier do Ajax eu mando um context para o serializer para que dentro dele 
			# ele de um overide no to_representation e mande a resposta de outro jeito
			serializer = CoachSerializer(queryset, many=True, context={"limited_representation" : True})
			return Response(serializer.data)


@api_view(['GET', 'POST', 'DELETE'])
def pacientes_coach(request, pk, format=None):

	if request.method == 'GET':
		# import pdb;
		# pdb.set_trace();
		# pk eh a coachId entao vou pegar e retornar a lista de perfils de pacientes
		pacientes_coach = Coach.objects.get(pk=pk).pacientes_supervisionados.all()

		serializer = PacienteSerializer(pacientes_coach, many=True, context={"limited_representation" : True, "request": request})

		return Response(serializer.data, status=status.HTTP_200_OK)

	elif request.method == 'POST':

		# import pdb;
		# pdb.set_trace();
		# No post eu vou mandar o ID do Paciente, com isso eu adiciono na lista de pacientes do Coach
		paciente = Paciente.objects.get(pk=request.data['idPaciente'])

		coach = Coach.objects.get(pk=pk)
		coach.pacientes_supervisionados.add(paciente)

		#response = {"idCoach" : coach.id, "idPaciente adicionado a lista": paciente.id}
		
		# Na verdade ja eh melhor eu retornar a lista de Pacientes supervisionados, para assim nao precisar fazer outra requisicao no Front-end 
		# para pegar a lista mais nova
		pacientes_coach = coach.pacientes_supervisionados.all()
		serializer = PacienteSerializer(pacientes_coach, many=True, context={"limited_representation" : True})

		return Response(serializer.data, status=status.HTTP_201_CREATED)

	elif request.method == 'DELETE':
		# No delete eu vou mandar o ID do Paciente, com isso eu removo na lista de pacientes do Coach
		paciente = Paciente.objects.get(pk=request.data['idPaciente'])

		coach = Coach.objects.get(pk=pk)
		coach.pacientes_supervisionados.remove(paciente)

		#response = {"idCoach" : coach.id, "idPaciente removido da lista": paciente.id}
		
		pacientes_coach = coach.pacientes_supervisionados.all()
		serializer = PacienteSerializer(pacientes_coach, many=True, context={"limited_representation" : True})
		# Respondendo dizendo que a mudanca foi aceita
		return Response(serializer.data, status=status.HTTP_202_ACCEPTED)


class CoachDetail(generics.RetrieveUpdateDestroyAPIView):
	queryset = Coach.objects.all()
	serializer_class = CoachSerializer

	# Vou modificar o list tb pra mandar so algumas infos sobre o usuario e nao tudo
	def retrieve(self, request, *args, **kwargs):
		# import pdb;
		# pdb.set_trace();
		
		instance = self.get_object()

		if request.content_type == 'text/plain':
			serializer = self.get_serializer(instance)
			return Response(serializer.data)
		elif request.content_type == 'application/json':
			# Se vier do Ajax eu mando um context para o serializer para que dentro dele 
			# ele de um overide no to_representation e mande a resposta de outro jeito
			serializer = CoachSerializer(instance, context={"limited_representation" : True})
			return Response(serializer.data)


####################################################################################################################################################
#
#	CRIACAO DOS MODELS DOS USUARIOS
#
####################################################################################################################################################

class ChatList(generics.ListCreateAPIView):
	queryset = Chat.objects.all()
	serializer_class = ChatSerializer

	def create(self, request):

		# Criando o paciente na mao com o metodo definido no model
		# dps serializando para mandar o Response com o paciente como JSON
		chat = Chat(chatNameID=self.request.data['chatNameID'], coachUsername=self.request.data['coachUsername'])
		chat.save()

		# AGORA VOU PEGAR O OBJETO DO COACH E O PACIENTE PARA ADICIONAR NO CHAT
		coach_participante = Coach.objects.get(perfil__user__username=self.request.data['coachUsername'])
		#paciente_participante = Paciente.objects.get(perfil__user__username=self.request.data['pacienteUsername'])

		# AO CRIAR UM CHAT EU POSSO TA MANDANDO SO UM PACIENTE NO CASO DO CHAT INDIVIDUAL OU VARIOS NO CASO DE CRIAR UM CHAT DE GRUPO
		pacientesUsernames = json.loads(self.request.data['pacientesUsernames'])

		# ENTAO ADICIONO CADA UM NA LISTA DE PACIENTES PART DESSE CHAT, SEJA DE GRUPO OU INDIVIDUAL
		for pacienteUsername in pacientesUsernames:
			paciente = Paciente.objects.get(perfil__user__username=pacienteUsername)
			chat.pacientesParticipantes.add(paciente)

		chat.coachParticipante = coach_participante
		chat.save()

		###########################################################
		# SE TIVER SIDO UM CHAT COM MAIS DE UM NO pacientesUsernames ENTAO FOI UM CHAT DE GRUPO
		# E VAMOS ADICIONA-LO NO RESPECTIVO GRUPO
		if len(pacientesUsernames) > 1:
			# Pego a ID do grupo
			# Vem no formato CdeboraG23
			grupo_id = int(self.request.data['chatNameID'].split('G')[1])
			grupo = Grupo.objects.get(id=grupo_id)
			grupo.chat = chat
			grupo.save()
		###########################################################

		# Pegar TODOS OS CHATS DO COACH QUE ADICIONOU ESSE NOVO
		# ASSIM SO RETORNAREMOS OS CHATS DOS COACHES LOGADOS
		chatsDoCoach = Chat.objects.filter(coachUsername=self.request.data['coachUsername'])

		# Vou pegar so os chatNameIDs e retornar
		chatsInfo = []
		for chat in chatsDoCoach:
			pacDoChat = chat.pacientesParticipantes.all()
			usernamesPacientes = []
			for paciente in pacDoChat:
				usernamesPacientes.append(paciente.perfil.user.username)
			chatsInfo.append({"chatNameID": chat.chatNameID, "coach": chat.coachUsername, "usernamesPacientes":usernamesPacientes})

		#return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(chatsInfo, status=status.HTTP_201_CREATED)

class ChatDetail(generics.RetrieveUpdateDestroyAPIView):
	queryset = Chat.objects.all()
	serializer_class = ChatSerializer


@api_view(['GET', 'POST', 'DELETE'])
def chat_exists(request, chatNameID, format=None):

	if request.method == 'GET':
		chat = Chat.objects.get(chatNameID=chatNameID)
		if chat != None:
			return Response({"chat_existe":True}, status=status.HTTP_200_OK)
		else:
			return Response({"chat_existe":False}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET', 'POST', 'DELETE'])
def get_coach_chats(request, coachUsername, format=None):

	if request.method == 'GET':
		chatsDoCoach = Chat.objects.filter(coachUsername=coachUsername)

		chatsInfo = []
		if len(chatsDoCoach) > 0:
			# Vou pegar so os chatNameIDs e retornar
			for chat in chatsDoCoach:
				pacDoChat = chat.pacientesParticipantes.all()
				usernamesPacientes = []
				for paciente in pacDoChat:
					usernamesPacientes.append(paciente.perfil.user.username)
				chatsInfo.append({"chatNameID": chat.chatNameID, "coach": chat.coachUsername, "usernamesPacientes":usernamesPacientes})
		
		return Response(chatsInfo, status=status.HTTP_200_OK)
		# else:
		# 	return Response({"chat_existe":False}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET', 'POST', 'DELETE'])
def get_paciente_chats(request, pacienteUsername, format=None):

	if request.method == 'GET':
		paciente = Paciente.objects.get(perfil__user__username=pacienteUsername)
		chatsDoPaciente = []

		for chat in Chat.objects.all():
			if paciente in chat.pacientesParticipantes.all():
				chatsDoPaciente.append(chat)

		chatsInfo = []
		if len(chatsDoPaciente) > 0:
			# Vou pegar so os chatNameIDs e retornar
			for chat in chatsDoPaciente:
				pacDoChat = chat.pacientesParticipantes.all()
				usernamesPacientes = []
				for paciente in pacDoChat:
					usernamesPacientes.append(paciente.perfil.user.username)
				chatsInfo.append({"chatNameID": chat.chatNameID, "coach": chat.coachUsername, "usernamesPacientes":usernamesPacientes})
		
		return Response(chatsInfo, status=status.HTTP_200_OK)
		# else:
		# 	return Response({"chat_existe":False}, status=status.HTTP_404_NOT_FOUND)




class GrupoList(generics.ListCreateAPIView):
	queryset = Grupo.objects.all()
	serializer_class = GrupoSerializer

	def create(self, request):

		# import pdb;
		# pdb.set_trace();

		grupo = Grupo(nome_grupo=self.request.data['nome_grupo'])
		# Vou pegar o coach com o username para salvar
		coachDoGrupo = Coach.objects.get(perfil__user__username=self.request.data['coachUsername'])
		grupo.coach = coachDoGrupo
		grupo.save()

		# Pegando os pacientes pelo username e dps adicionando
		#pacientesDoGrupo = []

		# self.request.data['pacientesUsernames'] VEM COMO JSON ENTAO VOU CONVERTER PARA ARRAY
		pacientesUsernames = json.loads(self.request.data['pacientesUsernames'])
		for pacienteUsername in pacientesUsernames:
			paciente = Paciente.objects.get(perfil__user__username=pacienteUsername)
			grupo.pacientes.add(paciente)

		grupo.save()

		# Pegando todos os grupos do coach para retornar
		gruposDoCoach = Grupo.objects.filter(coach__perfil__user__username=self.request.data['coachUsername'])
		gruposResponse = []

		gruposInfos = []
		for grupo in gruposDoCoach:
			# Pegando primeiro os pacientes do grupo
			pacientesGrupo = []

			# VOU BOTAR A ID TB PRA FACILITAR NA HORA DE AO CLICAR NO NOME DO PACIENTE IR PARA A PAGINA DELE NO FRONT-END
			pacientesInfo = []
			pacientes = []

			for paciente in grupo.pacientes.all():
				pacienteUsername = paciente.perfil.user.username
				pacientesGrupo.append(pacienteUsername)

				# PROVENDO ID E USERNAME DO PACIENTE
				#pacientesInfo.append({"username": pacienteUsername, "id": paciente.id})

				# PASSANDO AS INFOS PROVIDAS PELO SERIALIZER DO PACIENTE PARA TER AS MESMAS INFOS QUE TEMOS NO state.pacientes_supervisionados DO REDUX
				paciente_serializer = PacienteSerializer(paciente, context={"limited_representation" : True})
				pacientes.append(paciente_serializer.data)

			coachUsername = grupo.coach.perfil.user.username
			grupo_id = grupo.id
			grupo_data_inicio = grupo.data_inicio
			gruposResponse.append({ "grupo_id": grupo_id, "nome_grupo":grupo.nome_grupo, "coach":coachUsername, "usernamesPacientes":pacientesGrupo, "pacientes": pacientes, 
				"data_inicio": grupo_data_inicio})

		return Response(gruposResponse, status=status.HTTP_200_OK)


class GrupoDetail(generics.RetrieveUpdateDestroyAPIView):
	queryset = Grupo.objects.all()
	serializer_class = GrupoSerializer


@api_view(['GET', 'POST', 'DELETE'])
def get_coach_grupos(request, coachUsername, format=None):

	if request.method == 'GET':
		gruposDoCoach = Grupo.objects.filter(coach__perfil__user__username=coachUsername)

		gruposInfo = []

		if len(gruposDoCoach) > 0:
			# Vou pegar so os chatNameIDs e retornar
			for grupo in gruposDoCoach:
				pacDoGrupo = grupo.pacientes.all()
				usernamesPacientes = []

				# VOU BOTAR A ID TB PRA FACILITAR NA HORA DE AO CLICAR NO NOME DO PACIENTE IR PARA A PAGINA DELE NO FRONT-END
				pacientesInfo = []
				pacientes = []

				for paciente in pacDoGrupo:
					usernamesPacientes.append(paciente.perfil.user.username)

					# PROVENDO ID E USERNAME DO PACIENTE
					#pacientesInfo.append({"username": paciente.perfil.user.username, "id": paciente.id})

					# PASSANDO AS INFOS PROVIDAS PELO SERIALIZER DO PACIENTE PARA TER AS MESMAS INFOS QUE TEMOS NO state.pacientes_supervisionados DO REDUX
					paciente_serializer = PacienteSerializer(paciente, context={"limited_representation" : True})
					pacientes.append(paciente_serializer.data)

				grupo_id = grupo.id
				grupo_data_inicio = grupo.data_inicio
				gruposInfo.append({"grupo_id": grupo_id, "nome_grupo": grupo.nome_grupo, "coach": grupo.coach.perfil.user.username, "usernamesPacientes":usernamesPacientes, 
					"pacientes": pacientes, "data_inicio": grupo_data_inicio})
		
		return Response(gruposInfo, status=status.HTTP_200_OK)

######################################################################################################################################
#
#	OVERRIDING ObtainAuthToken PARA QUE ELE RETORNE O USUARIO TB E NAO SO O TOKEN AO LOGAR
#
######################################################################################################################################

## ANTES FAZIA OVERRIDE DE ObtainAuthToken E SO MUDAVA O POST MAS AGORA EU MUDEI O SERIALIZER
## TB, ENTAO EH COMO SE FOSSE UMA CLASSE NOVA E NAO HERDA MAIS
class CustomObtainAuthToken(APIView):
	throttle_classes = ()
	permission_classes = ()
	parser_classes = (parsers.FormParser, parsers.MultiPartParser, parsers.JSONParser,)
	renderer_classes = (renderers.JSONRenderer,)
	serializer_class = AuthCustomTokenSerializer

	def post(self, request, *args, **kwargs):
		#Calling the post method of the parent class to get the token.
		#Then we lookup the token to get the user associated
		# response = super(CustomObtainAuthToken, self).post(request, *args, **kwargs)
		# print(response);
		
		# NOVO METODO POST COMPLETO
		# No serializer eu to autenticando o usuario
		serializer = AuthCustomTokenSerializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		# Pega o usuario ja autenticado
		user = serializer.validated_data['user']
		token, created = Token.objects.get_or_create(user=user)
		#token = Token.objects.get(key=response.data['token'])
		
		# Tem que serializer o user pq senao vai dar:
		# TypeError at /api-token-auth/↵<User: rani> is not JSON serializable
		# ao fazer a requisicao
		print(token)
		user_serialized = UserSerializer(token.user)

		# import pdb;
		# pdb.set_trace();

		# Nao vou dar todas as informacoes do User para o front-end!
		# Aqui eu limito o que vou passar

		# Vou botar se ele eh coach para dps poder pegar os pac_supervisionados no front-end
		# se tem perfil associado olha, senao retorna normal
		if hasattr(user, 'perfil'):
			if hasattr(user.perfil, 'coach'):
				user = {"username": user_serialized.data['username'], "email": user_serialized.data['email'],
				"first_name": user_serialized.data['first_name'], "last_name": user_serialized.data['last_name'],
				"id": user_serialized.data['id'], "isCoach": True, "coachId": user.perfil.coach.id}
			else:
				user = {"username": user_serialized.data['username'], "email": user_serialized.data['email'],
				"first_name": user_serialized.data['first_name'], "last_name": user_serialized.data['last_name'],
				"id": user_serialized.data['id'], "isCoach": False, "pacienteId": user.perfil.paciente.id}
		# user = {"username": user_serialized.data['username'], "email": user_serialized.data['email'],
		# "first_name": user_serialized.data['first_name'], "last_name": user_serialized.data['last_name'],
		# "id": user_serialized.data['id']}
		return Response({'token': token.key, 'user': user})

#########################################################################
def render_home(request):
	return render(request, 'main_view.html')

def render_view1(request):
	return render(request, 'view1.html')

def render_view2(request):
	return render(request, 'view2.html')

def render_chat(request):
	return render(request, 'viewChat.html')
