from rest_framework import serializers
from .models import Ingrediente, Receita, Passo_da_Receita, Parte_da_Receita, Foto_Receita, Perfil, Paciente, Coach
from django.contrib.auth.models import User
import json

#Usado no Custom AuthTokenSerializer
from django.contrib.auth import authenticate
from django.shortcuts import get_object_or_404
from django.utils.translation import ugettext_lazy as _

from django.core.validators import validate_email
from django.core.exceptions import ValidationError

# from drf_extra_fields.fields import Base64ImageField

# class IngredienteSerializer(serializers.Serializer):
# 	quantidade = serializers.CharField(max_length=50)
# 	nome_ingrediente = serializers.CharField(max_length=200)


# class ReceitaSerializer(serializers.Serializer):
# 	id = serializers.IntegerField(read_only=True)
# 	
class IngredienteSerializer(serializers.ModelSerializer):
	class Meta:
		model = Ingrediente
		fields = ('id', 'quantidade', 'nome_ingrediente')

class Passo_da_ReceitaSerializer(serializers.ModelSerializer):
	class Meta:
		model = Passo_da_Receita
		fields = ('id', 'descricao')

class Parte_da_ReceitaSerializer(serializers.ModelSerializer):
	# ingredientes = serializers.ListField(child=IngredienteSerializer(many=True))
	# modo_de_preparo = serializers.ListField(child=Passo_da_ReceitaSerializer(many=True))
	ingredientes = IngredienteSerializer(many=True)
	modo_de_preparo = Passo_da_ReceitaSerializer(many=True)

	class Meta:
		model = Parte_da_Receita
		fields = ('id', 'nome_da_parte', 'ingredientes', 'modo_de_preparo')

	# def validate(self, data):
	# 	import pdb;
	# 	pdb.set_trace();

	# 	data = json.loads(data)
	# 	return data


	def create(self, validated_data):
		
		#validated_data = json.loads(validated_data)
		ingredientes_list = validated_data.pop('ingredientes')
		modo_de_preparo_list = validated_data.pop('modo_de_preparo')
		

		parte_da_receita = Parte_da_Receita.objects.create(**validated_data)

		# Salvando os ingredientes na lista de ingredientes dessa Parte
		for ingrediente in ingredientes_list:
			# # Returns a tuple of (object, created), where object is the retrieved 
			# or created object and created is a boolean specifying whether a new 
			# object was created.
			ingrediente, created = Ingrediente.objects.get_or_create(**ingrediente)
			parte_da_receita.ingredientes.add(ingrediente)

		# Salvando os passos na lista de passos(modo_de_preparo) dessa Parte
		for passo in modo_de_preparo_list:
			passo, created = Passo_da_Receita.objects.get_or_create(**passo)
			parte_da_receita.modo_de_preparo.add(passo)

		return parte_da_receita

class Foto_ReceitaSerializer(serializers.ModelSerializer):

	class Meta:
		model = Foto_Receita
		fields = '__all__'

	def create(self, validated_data):

		import pdb;
		pdb.set_trace();

		foto = Foto_Receita.objects.create(**validated_data)
		return foto

class ReceitaSerializer(serializers.ModelSerializer):
	foto_da_receita = Foto_ReceitaSerializer(required=False, allow_null=True) 
	subpartes = Parte_da_ReceitaSerializer(many=True)
	class Meta:
		model = Receita
		fields = ('id', 'nome_receita', 'foto_da_receita', 'url_da_imagem', 'subpartes', 'categoria', 'tempo_de_preparo', 'nivel_de_dificuldade')

	def create(self, validated_data):
		import pdb;
		pdb.set_trace();
		subpartes_list = validated_data.pop('subpartes')

		receita = Receita.objects.create(**validated_data)

		# Salvando as subpartes
		for subparte in subpartes_list:
			# Como em parte_da_receita tem ManyToMany relationship nao tem como criar ela de uma vez so
			# Tem que primeiro criar sem nada dos ManyToMany para dps adicionar
			serializer = Parte_da_ReceitaSerializer(data=subparte)
			if serializer.is_valid():
				subparte_serialized = serializer.save()
			else:
				subparte_serialized = None
			#subparte = Parte_da_Receita.objects.create(**subparte)
			receita.subpartes.add(subparte_serialized)

		return receita


# data2 = {
# 	'ingredientes': [{'nome_ingrediente': "150 g de farinha de trigo (1 xícara cheia)"}, {'nome_ingrediente': "1 colher de chá de fermento em pó"}],
# 	'modo_de_preparo': [{'descricao': "Misturar a manteiga, levar por mais 30 segundos"},
# 	{'descricao': "Misture"}]
# }

#################################################################
#
# SERIALIZERS DOS MODELOS DO USUARIO
#
#################################################################

class UserSerializer(serializers.ModelSerializer):

	class Meta:
		model = User
		fields = '__all__'

	# TEM QUE FAZER O OVERRIDE DESSES METODOS PARA SALVAR A SENHA COM HASH
	# PQ SENAO ELE VAI SALVAR COMO PLAIN TEXT
	def create(self, validated_data):
		# Nao precisa complicar nada aqui tentando fazer o hash da senha com set_password()
		# So precisa chamar o create_user(username, email, password) padrao
		user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])

		print("New user")
		print(user)
		return user

	def update(self, instance, validated_data):
		for attr, value in validated_data.items():
			if attr == 'password':
				instance.set_password(value)
			else:
				setattr(instance, attr, value)
		instance.save()
		return instance

class PerfilSerializer(serializers.ModelSerializer):
	user = UserSerializer()

	class Meta:
		model = Perfil
		fields = '__all__'

class PacienteSerializer(serializers.ModelSerializer):
	perfil = PerfilSerializer()

	class Meta:
		model = Paciente
		fields = '__all__'

class CoachSerializer(serializers.ModelSerializer):
	perfil = PerfilSerializer()

	class Meta:
		model = Coach
		fields = '__all__'

#############################################################
##
#
#	TEM QUE CRIAR UM SERIALIZER NOVO PARA QUE O OBTAINAUTHTOKEN 
# 	POSSA RECEBER EMAIL E USERNAME NO LOGIN E SIGNUP
#
##
#############################################################

### FUNCAO PARA VALIDAR SE EH EMAIL MESMO
def validateEmail( email ):
	try:
		validate_email( email )
		return True
	except ValidationError:
		return False


class AuthCustomTokenSerializer(serializers.Serializer):
    email_or_username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, attrs):
        email_or_username = attrs.get('email_or_username')
        password = attrs.get('password')

        if email_or_username and password:
            # Check if user sent email
            if validateEmail(email_or_username):
           	    # Se mandou o email, entao retorna o usuario fazendo a consulta pelo email
                user_request = get_object_or_404(
                    User,
                    email=email_or_username,
                )

           	    # Pega o username desse usuario
                email_or_username = user_request.username
                print(email_or_username)

            print(password)
            # Se nao tiver sido com email entao ele ja vai ter o username e autentica
            user = authenticate(username=email_or_username, password=password)
            print(user)

            if user:
                if not user.is_active:
                    msg = _('User account is disabled.')
                    raise ValidationError(msg)
            else:
                msg = _('Unable to log in with provided credentials.')
                raise ValidationError(msg)
        else:
            msg = _('Must include "email or username" and "password"')
            raise ValidationError(msg)

        attrs['user'] = user
        return attrs