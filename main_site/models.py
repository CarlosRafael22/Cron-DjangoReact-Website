from django.db import models
from django.conf import settings
from django.contrib.auth.models import User

# Unique identifier pra gerar o nome da imagem
import uuid


from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

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
	modo_de_preparo = models.ManyToManyField(Passo_da_Receita)

# TO CRIANDO UM MODEL DA IMAGEM PRA VER SE FICA MAIS FACIL DE SERIALIZAR
# E TB PRA DPS PODER TER VARIAS IMAGENS EM UMA MESMA RECEITA
class Foto_Receita(models.Model):
	def upload_filename(instance, filename):
		extension = filename.split(".")[-1]
		return "{}.{}".format(uuid.uuid4(), extension)

	foto = models.ImageField(upload_to=upload_filename, null=True)


class Receita(models.Model):
	def get_image_path(self, instance):
		self.url_da_imagem = '/media/' + 'categorias/{0}/{1}'.format(self.categoria, instance)
		return settings.MEDIA_ROOT + 'categorias/{0}/{1}'.format(self.categoria, instance)


	nome_receita = models.CharField(max_length=100, default="Receita")
	#foto_da_receita = models.ImageField(upload_to=get_image_path, null=True)
	foto_da_receita = models.ForeignKey(Foto_Receita, null=True, on_delete=models.CASCADE, default=1)
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


###################################################################################################
#
#	CRIACAO DOS MODELS DOS USUARIOS
#
###################################################################################################
class Perfil(models.Model):
	def get_image_path(self, instance):
		self.url_da_imagem = '/media/' + 'perfil/{0}/{1}'.format(self.categoria, instance)
		return settings.MEDIA_ROOT + 'perfil/{0}/{1}'.format(self.categoria, instance)

	imagem_perfil = models.ImageField(upload_to=get_image_path, null=True)
	user = models.OneToOneField(User)
	cpf = models.CharField(max_length=15, null=True)
	data_nascimento = models.DateTimeField(null=True)

	def __str__(self):
		return self.user.first_name

# O MESMO MANAGER VAI SER USADO PARA CRIAR O PACIENTE OU COACH. POIS O QUE EH NECESSARIO NESSA HORA EH SO CRIAR O USUARIO E O PERFIL
class PessoaManager(models.Manager):
	def create_pessoa(self, username, email, password, first_name, last_name, cpf=None, data_nascimento=None):
		#Criando o usuario primeiro
		usuario = User.objects.create_user(username, email, password)
		usuario.first_name = first_name
		usuario.last_name = last_name
		usuario.save()

		perfil = Perfil(user=usuario, cpf=cpf, data_nascimento=data_nascimento)
		perfil.save()

		pessoa = self.create(perfil=perfil)
		return pessoa

class Paciente(models.Model):
	perfil = models.OneToOneField(Perfil)

	objects = PessoaManager()

	def __str__(self):
		return self.perfil.user.first_name



class Coach(models.Model):
	perfil = models.OneToOneField(Perfil)
	pacientes_supervisionados = models.ManyToManyField(Paciente)

	objects = PessoaManager()

	def __str__(self):
		return self.perfil.user.first_name