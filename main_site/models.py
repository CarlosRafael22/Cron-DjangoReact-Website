from django.db import models
from django.conf import settings

# Unique identifier pra gerar o nome da imagem
import uuid

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
