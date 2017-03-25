from django.db import models
from django.conf import settings
from django.contrib.auth.models import User
from django.utils import timezone

# Unique identifier pra gerar o nome da imagem
import uuid
from datetime import datetime

from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

from simple_history.models import HistoricalRecords 

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


# Create your models here.
class Ingrediente(models.Model):
	quantidade = models.CharField(max_length=50, null=True)
	nome_ingrediente = models.CharField(max_length=100)

	def __str__(self):
		return str(self.quantidade)+" "+self.nome_ingrediente

class Passo_da_Receita(models.Model):
	descricao = models.TextField()

class Parte_da_Receita(models.Model):
	nome_da_parte = models.CharField(max_length=50, null=True)
	ingredientes = models.ManyToManyField(Ingrediente)
	modo_de_preparo = models.ManyToManyField(Passo_da_Receita, through='Ordem_Passo_na_Parte_Receita')

class Ordem_Passo_na_Parte_Receita(models.Model):
	passo = models.ForeignKey(Passo_da_Receita)
	parte_da_receita = models.ForeignKey(Parte_da_Receita)
	ordem_passo_na_parte = models.IntegerField()

# TO CRIANDO UM MODEL DA IMAGEM PRA VER SE FICA MAIS FACIL DE SERIALIZAR
# E TB PRA DPS PODER TER VARIAS IMAGENS EM UMA MESMA RECEITA
class Foto_Receita(models.Model):
	def upload_filename(instance, filename):
		extension = filename.split(".")[-1]
		return "{}.{}".format(uuid.uuid4(), extension)

	foto = models.ImageField(upload_to=upload_filename, null=True)


DEFAULT_FOTO_ID = 1
DEFAULT_SUBPARTE_ID = 1
class Receita(models.Model):
	def get_image_path(self, instance):
		self.url_da_imagem = '/media/' + 'categorias/{0}/{1}'.format(self.categoria, instance)
		return settings.MEDIA_ROOT + 'categorias/{0}/{1}'.format(self.categoria, instance)


	nome_receita = models.CharField(max_length=100, default="Receita")
	#foto_da_receita = models.ImageField(upload_to=get_image_path, null=True)
	foto_da_receita = models.ForeignKey(Foto_Receita, null=True, on_delete=models.CASCADE, default=DEFAULT_FOTO_ID)
	url_da_imagem = models.CharField(max_length=100, null=True)
	subpartes = models.ManyToManyField(Parte_da_Receita)
	categoria = models.CharField(max_length=100, default="Sem categoria")
	tempo_de_preparo = models.IntegerField(null=True)
	nivel_de_dificuldade = models.IntegerField(null=True)

	# def nome_receita_default(self):
	# 	return "Receita "+self._id

	# def save(self, *args, **kw):
	# 	if not self.nome_receita:
	# 		self.nome_receita = "Receita "+self._id
	# 	super(Receita, self).save(*args, **kw)


####################################################################################################################################################
#
#	CRIACAO DOS MODELS DOS USUARIOS
#
####################################################################################################################################################

# TO CRIANDO UM MODEL DA IMAGEM PRA VER SE FICA MAIS FACIL DE SERIALIZAR
# E TB PRA DPS PODER TER VARIAS IMAGENS EM UMA MESMA RECEITA
class Foto_Perfil(models.Model):
	def upload_filename(instance, filename):
		extension = filename.split(".")[-1]
		return "{}.{}".format(uuid.uuid4(), extension)

	foto = models.ImageField(upload_to=upload_filename, null=True)

	def __str__(self):
		return str(self.id)

DEFAULT_FOTO_PERFIL_ID = 1
class Perfil(models.Model):
	def get_image_path(self, instance):
		self.url_da_imagem = '/media/' + 'perfil/{0}/{1}'.format(self.categoria, instance)
		return settings.MEDIA_ROOT + 'perfil/{0}/{1}'.format(self.categoria, instance)

	#imagem_perfil = models.ImageField(upload_to=get_image_path, null=True)
	foto_perfil = models.ForeignKey(Foto_Perfil, null=True, on_delete=models.CASCADE, default=DEFAULT_FOTO_PERFIL_ID)
	user = models.OneToOneField(User)
	cpf = models.CharField(max_length=15, null=True)
	data_nascimento = models.DateField(null=True)

	# A maioria do user nao vai ter os nomes, entao mostra o username
	def __str__(self):
		return self.user.username

# O MESMO MANAGER VAI SER USADO PARA CRIAR O PACIENTE OU COACH. POIS O QUE EH NECESSARIO NESSA HORA EH SO CRIAR O USUARIO E O PERFIL
class PessoaManager(models.Manager):
	def create_pessoa(self, username, email, password, first_name=None, last_name=None, cpf=None, data_nascimento=None):
		#Criando o usuario primeiro
		usuario = User.objects.create_user(username, email, password)
		if (first_name != None) and (last_name != None):
			usuario.first_name = first_name
			usuario.last_name = last_name
		usuario.save()

		# Convertando para receber no formato dd/mm/yyyy e ja mandar o date
		if data_nascimento:
			data_nascimento = datetime.strptime(data_nascimento, "%d/%m/%Y").date()
		perfil = Perfil(user=usuario, cpf=cpf, data_nascimento=data_nascimento)
		perfil.save()

		pessoa = self.create(perfil=perfil)
		return pessoa

class Paciente(models.Model):
	perfil = models.OneToOneField(Perfil)
	peso = models.DecimalField(max_digits=5, decimal_places=2, null=True)
	medida_abdominal = models.DecimalField(max_digits=5, decimal_places=2, null=True)
	medida_cintura = models.DecimalField(max_digits=5, decimal_places=2, null=True)


	objects = PessoaManager()

	def __str__(self):
		return self.perfil.user.username

class Coach(models.Model):
	perfil = models.OneToOneField(Perfil)
	pacientes_supervisionados = models.ManyToManyField(Paciente)

	objects = PessoaManager()

	def __str__(self):
		return self.perfil.user.username

####################################################################################################################################################
#
#	CRIACAO DOS MODELS DOS CHATS
#
####################################################################################################################################################

class Chat(models.Model):
	chatNameID = models.CharField(max_length=50)
	# So pra facilitar na hora de popular e colocar no Redux state
	coachUsername = models.CharField(max_length=50, default="Coach")
	coachParticipante = models.ForeignKey(Coach, null=True)
	pacientesParticipantes = models.ManyToManyField(Paciente)

	def __str__(self):
		return self.chatNameID

class Grupo(models.Model):

	nome_grupo = models.CharField(max_length=50, null=True)
	chat = models.ForeignKey(Chat, null=True)
	coach = models.ForeignKey(Coach)
	pacientes = models.ManyToManyField(Paciente)
	data_inicio = models.DateField(null=True)

	def __str__(self):
		name = "Grupo "+str(self.pk)+" coach "+str(self.coach.perfil.user.username)
		return name

	def save(self, *args, **kwargs):
		if not self.id:
			self.data_inicio = timezone.localtime(timezone.now())
		return super(Grupo, self).save(*args, **kwargs)


####################################################################################################################################################
#
#	CRIACAO DOS MODELS DOS MONITORAMENTOS
#
####################################################################################################################################################

class Log_Peso(models.Model):
	peso = models.DecimalField(max_digits=5, decimal_places=2, null=True)
	data = models.DateTimeField()
	participante = models.OneToOneField(Paciente)
	history = HistoricalRecords()


	# for log in log1.history.all():
	# 	type(log.history_date)
	# 	print(log.history_date - timedelta(hours=3) )
	#  TEM QUE SUBTRAIR 3 HORAS PARA DAR A HORA DAQUI JA QUE ELE PEGA A HORA DE GREENWICH

	def __str__(self):
		peso_mais_recente = str(self.history.most_recent().peso)
		response = self.participante.perfil.user.username + " " + peso_mais_recente
		return response

	def save(self, *args, **kwargs):
		if not self.id:
			self.data = timezone.localtime(timezone.now())

		# Salvando o peso mais recente no Paciente
		# import pdb;
		# pdb.set_trace();
		# partic = Paciente.objects.get(id=self.participante.id)
		# partic.peso = self.history.most_recent().peso
		# partic.save()

		return super(Log_Peso, self).save(*args, **kwargs)

# Create your models here.
class Porcao(models.Model):
	quantidade = models.CharField(max_length=50, null=True)
	ingrediente = models.CharField(max_length=100)

	def __str__(self):
		return str(self.quantidade)+" "+self.ingrediente

# ManyToMany pq a porcao pode aparecer em varias refeicoes diferentes ja que ela vai ser
# numero exato de quantidade(ex: 3colheres, 2 copos..) e  ingrediente(ex: frango grelhado, vinagrete)
class Refeicao(models.Model):
	nome_refeicao = models.CharField(max_length=50)
	porcoes = models.ManyToManyField(Porcao)

	def __str__(self):
		return self.nome_refeicao + " " + str(self.id)

class Foto_Refeicao(models.Model):
	def upload_filename(instance, filename):
		extension = filename.split(".")[-1]
		return "{}.{}".format(uuid.uuid4(), extension)

	foto = models.ImageField(upload_to=upload_filename, null=True)

	def __str__(self):
		return str(self.id)

class Log_Refeicao(models.Model):
	# Pode ser a descricao da Refeicao ou a foto entao ambos tem q ser null=True mas tem q ter um dos dois
	refeicao = models.OneToOneField(Refeicao, null=True)
	# Ou o usuario pode colocar uma foto ao inves de descrever a refeicao
	refeicao_foto = models.OneToOneField(Foto_Refeicao, null=True)

	# O usuario pode logar uma refeicao mas ter feito a mesma em algum horario antes
	#  entao ele vai ter q setar o horario na mao por isso que aqui nao pode seta-lo automaticamente
	data_hora = models.DateTimeField()
	local = models.CharField(max_length=50, null=True)
	satisfacao = models.CharField(max_length=50, null=True)
	diario_alimentar = models.ForeignKey("Diario_Alimentar", related_name="logs_refeicoes")

	def __str__(self):
		# Ve se o log tem uma foto ou objeto refeicao
		# import pdb;
		# pdb.set_trace();

		if self.refeicao:
			return self.refeicao.nome_refeicao + " em " + str(self.data_hora)
		else:
			return "Foto Refeicao " + " em " + str(self.data_hora)

	def save(self, *args, **kwargs):
		if not self.id:
			# Se forneceram data e hora a gnt cria com o que deram se nao vai no automatico
			if not self.data_hora:
				self.data_hora = timezone.localtime(timezone.now())
			else:
				dt = datetime.strptime(self.data_hora, "%d/%m/%y %H:%M")
				self.data_hora = dt
		return super(Log_Refeicao, self).save(*args, **kwargs)

class Diario_Alimentar(models.Model):
	participante = models.OneToOneField(Paciente)
	# pode-se acessar os logs_refeicoes desse diario por Diario.logs_refeicoes ja que tem a relacao inversa
	# do ForeignKey no Log_Refeicao

	def __str__(self):
		return "Diario " + self.participante.perfil.user.username

class Log_Item(models.Model):
	history = HistoricalRecords(inherit=True)
	person = models.ForeignKey("Person", related_name='logs_item')


class Log_Meal(Log_Item):
	refeicao_nome = models.CharField(max_length=100)
	data_hora = models.DateTimeField()
	# person = models.ForeignKey(Person, related_name='logs_meal')

	def __str__(self):
		return self.refeicao_nome

class Log_Weight(Log_Item):
	peso = models.IntegerField()
	data_hora = models.DateTimeField()
	# person = models.ForeignKey(Person, related_name='logs_weights')

	def __str__(self):
		return self.peso

class Person(models.Model):
	nome = models.CharField(max_length=50)
