from rest_framework import serializers
from .models import (Ingrediente, Receita, Passo_da_Receita, Parte_da_Receita, Foto_Receita, Perfil, Paciente, Coach, Ordem_Passo_na_Parte_Receita, Chat, Grupo)
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
	#modo_de_preparo = Ordem_Passo_na_Parte_ReceitaSerializer(source='ordem_passo_na_parte_receita_set',many=True)
	modo_de_preparo = Passo_da_ReceitaSerializer(many=True)

	class Meta:
		model = Parte_da_Receita
		fields = ('id', 'nome_da_parte', 'ingredientes', 'modo_de_preparo')

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
		# Para acessar o index que vai servir para armazenar a ordem que o passo vai ta na receita
		for ordemIndex, passo in enumerate(modo_de_preparo_list, start=1):
			passo, created = Passo_da_Receita.objects.get_or_create(**passo)
			# import pdb;
			# pdb.set_trace();

			# Adicionar na Ordem_Passo pq ai adiciona no modo_de_preparo -> nao tem como fazer o modo_de_preparo.add(passo) mais
			# parte_da_receita.modo_de_preparo.add(passo)
			ordem = Ordem_Passo_na_Parte_Receita(passo=passo, parte_da_receita=parte_da_receita, ordem_passo_na_parte=ordemIndex)
			ordem.save()

		return parte_da_receita


class Ordem_Passo_na_Parte_ReceitaSerializer(serializers.ModelSerializer):
	parte_da_receita = serializers.ReadOnlyField(source='parte_da_receita.id')
	passo = Passo_da_ReceitaSerializer()

	class Meta:
		model = Ordem_Passo_na_Parte_Receita
		fields = ('passo', 'parte_da_receita', 'ordem_passo_na_parte')

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
		# import pdb;
		# pdb.set_trace();
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


#################################################################
#
# SERIALIZERS DOS MODELOS DO USUARIO
#
#################################################################

class UserSerializer(serializers.ModelSerializer):

	class Meta:
		model = User
		fields = '__all__'

	# Vou overide aqui pra mudar o que ele manda de output dependendo se recebeu a request do browser ou Ajax
	def to_representation(self, obj):
		# import pdb;
		# pdb.set_trace;

		# Checando se mandou o context, se nao tiver mandado retorna a representacao normal, se tiver manda a com menos infos
		# Mandando info tb pra saber se ele eh Coach, isso vai servir na hora de ver o tipo de user Logado
		special_representation = self.context.get("limited_representation")
		if special_representation:

			# Vou botar se ele eh coach para dps poder pegar os pac_supervisionados no front-end
			# se tem perfil associado olha, senao retorna normal
			if hasattr(obj, 'perfil'):
				if hasattr(obj.perfil, 'coach'):
					user = {"username": obj.username, "email": obj.email,
					"first_name": obj.first_name, "last_name": obj.last_name,
					"id": obj.id, "isCoach": True, "coachId": obj.perfil.coach.id}
				else:
					user = {"username": obj.username, "email": obj.email,
					"first_name": obj.first_name, "last_name": obj.last_name,
					"id": obj.id, "isCoach": False}
			else:
				user = {"username": obj.username, "email": obj.email,
					"first_name": obj.first_name, "last_name": obj.last_name,
					"id": obj.id}
		
			ret = user
		else:
			# get the original representation
			ret = super(UserSerializer, self).to_representation(obj)

		return ret

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
	data_nascimento = serializers.DateField()

	class Meta:
		model = Perfil
		fields = '__all__'

	# Vou overide aqui pra mudar o que ele manda de output dependendo se recebeu a request do browser ou Ajax
	def to_representation(self, obj):
		# import pdb;
		# pdb.set_trace;

		# Checando se mandou o context, se nao tiver mandado retorna a representacao normal, se tiver manda a com menos infos
		special_representation = self.context.get("limited_representation")
		if special_representation:

			# Vendo se o perfil tem um coach ou paciente relacionado para colocar infos
			if hasattr(obj, 'paciente'):
				perfil = {"id": obj.id, "cpf": obj.cpf,
				"username": obj.user.username, "email": obj.user.email, "paciente" : True}
			else:
				perfil = {"id": obj.id, "cpf": obj.cpf,
				"username": obj.user.username, "email": obj.user.email, "coach": True}
			ret = perfil
		else:
			# get the original representation
			ret = super(PerfilSerializer, self).to_representation(obj)

		return ret



	#def create(self, validated_data)

# MODIFICAR ISSO QD ELE FOR RECEBER MAIS INFORMACOES
# AQUI SO TO FAZENDO O CADASTRO COM 
# username, email e password
class PacienteSerializer(serializers.ModelSerializer):
	perfil = PerfilSerializer()

	class Meta:
		model = Paciente
		fields = '__all__'

	def to_representation(self, obj):

		# Checando se mandou o context, se nao tiver mandado retorna a representacao normal, 
		# se tiver quer dizer que estou requisitando do site entao manda a com menos infos
		special_representation = self.context.get("limited_representation")
		if special_representation:

			# Para nao gerar: ValueError: The 'imagem_perfil' attribute has no file associated with it.
			# To checando logo aqui
			if obj.perfil.imagem_perfil:
				print("Tem imagem")
				imagem = obj.perfil.imagem_perfil
			else:
				print("Nao tem imagem")
				imagem = None

			# Tb vou botar a informacao de que coaches estao supervisionando esse paciente! Isso vai ser usado na hora de mostrar esse paciente no site
			# Se for um paciente do coach logado vai haver um botao para ele dessupervisionar
			coaches = obj.coach_set.all()
			if len(coaches) > 0:
				coaches_usernames = []
				for coach in coaches:
					coaches_usernames.append(coach.perfil.user.username)
			else:
				coaches_usernames = None

			paciente = {"id": obj.id, "data_nascimento": obj.perfil.data_nascimento, "cpf": obj.perfil.cpf, "perfilId" : obj.perfil.id,
				"imagem_perfil": imagem, 
				"userId": obj.perfil.user.id, "username": obj.perfil.user.username, "first_name": obj.perfil.user.first_name,
        		"last_name": obj.perfil.user.last_name, "email": obj.perfil.user.email, "paciente": True, "coaches": coaches_usernames}
        	# Botei "paciente": True pq no front-end no UsuarioInfoBox ele checa isso
			ret = paciente
		else:
			# get the original representation
			ret = super(PacienteSerializer, self).to_representation(obj)

		return ret



class CoachSerializer(serializers.ModelSerializer):
	perfil = PerfilSerializer()

	class Meta:
		model = Coach
		fields = '__all__'

	def to_representation(self, obj):

		# Checando se mandou o context, se nao tiver mandado retorna a representacao normal, 
		# se tiver quer dizer que estou requisitando do site entao manda a com menos infos
		special_representation = self.context.get("limited_representation")
		if special_representation:

			# Para nao gerar: ValueError: The 'imagem_perfil' attribute has no file associated with it.
			# To checando logo aqui
			if obj.perfil.imagem_perfil:
				print("Tem imagem")
				imagem = obj.perfil.imagem_perfil
			else:
				print("Nao tem imagem")
				imagem = None

			# Pegando os pacientes dele
			pacientes_coach = Coach.objects.get(pk=obj.pk).pacientes_supervisionados.all()
			pacientes_coaches_ids = []
			if len(pacientes_coach)> 0:
				for paciente in pacientes_coach:
					pacientes_coaches_ids.append(paciente.id)
			else:
				pacientes_coach_ids = None

			serializer = PacienteSerializer(pacientes_coach, many=True, context={"limited_representation" : True})

			coach = {"id": obj.id, "data_nascimento": obj.perfil.data_nascimento, "cpf": obj.perfil.cpf, "perfilId" : obj.perfil.id,
				"imagem_perfil": imagem, 
				"userId": obj.perfil.user.id, "username": obj.perfil.user.username, "first_name": obj.perfil.user.first_name,
        		"last_name": obj.perfil.user.last_name, "email": obj.perfil.user.email, "paciente": False, "pacientes_supervisionados_ids": pacientes_coaches_ids}
        	# Botei "paciente": True pq no front-end no UsuarioInfoBox ele checa isso
			ret = coach
		else:
			# get the original representation
			ret = super(CoachSerializer, self).to_representation(obj)

		return ret

####################################################################################################################################################
#
#	CRIACAO DOS MODELS DOS CHATS
#
####################################################################################################################################################

class ChatSerializer(serializers.ModelSerializer):
	coachParticipante = CoachSerializer(required=False)
	pacientesParticipantes = PacienteSerializer(many=True, required=False)

	class Meta:
		model = Chat
		fields = '__all__'

class GrupoSerializer(serializers.ModelSerializer):
	coach = CoachSerializer()
	pacientes = PacienteSerializer(required=False)
	chat = ChatSerializer(required=False)
	
	class Meta:
		model = Grupo
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