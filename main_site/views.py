from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from .models import (Ingrediente, Receita, Passo_da_Receita, Parte_da_Receita, Foto_Receita, Perfil, Paciente, Coach)
from django.contrib.auth.models import User
from .serializers import (IngredienteSerializer, ReceitaSerializer, Passo_da_ReceitaSerializer, Parte_da_ReceitaSerializer, Foto_ReceitaSerializer, 
	UserSerializer, PerfilSerializer, PacienteSerializer, CoachSerializer)

# IMPORTANDO O NOVO SERIALIZER DO CustomObtainAuthToken
from .serializers import AuthCustomTokenSerializer
from rest_framework import parsers, renderers

from rest_framework import generics
from rest_framework.decorators import parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView

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
		import pdb;
		pdb.set_trace();
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
@parser_classes((FormParser, MultiPartParser,))
def receita_list(request, format=None):

	if request.method == 'GET':
		# import pdb;
		# pdb.set_trace();
		partes_receita = Receita.objects.all()
		serializer = ReceitaSerializer(partes_receita, many=True)
		return Response(serializer.data)

	elif request.method == 'POST':
		import pdb;
		pdb.set_trace();
		serializer = ReceitaSerializer(data=request.data)
		if serializer.is_valid():
			# Salvando o objeto no banco
			serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ReceitaDetail(generics.RetrieveUpdateDestroyAPIView):
	queryset = Receita.objects.all()
	serializer_class = ReceitaSerializer
########################################################################

class Foto_ReceitaList(generics.ListCreateAPIView):
	queryset = Foto_Receita.objects.all()
	serializer_class = Foto_ReceitaSerializer

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

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
	permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
	queryset = User.objects.all()
	serializer_class = UserSerializer

########################################################################

class PerfilList(generics.ListCreateAPIView):
	queryset = Perfil.objects.all()
	serializer_class = PerfilSerializer

class PerfilDetail(generics.RetrieveUpdateDestroyAPIView):
	queryset = Perfil.objects.all()
	serializer_class = PerfilSerializer

########################################################################

class PacienteList(generics.ListCreateAPIView):
	queryset = Paciente.objects.all()
	serializer_class = PacienteSerializer

class PacienteDetail(generics.RetrieveUpdateDestroyAPIView):
	queryset = Paciente.objects.all()
	serializer_class = PacienteSerializer

########################################################################

class CoachList(generics.ListCreateAPIView):
	queryset = Coach.objects.all()
	serializer_class = CoachSerializer

class CoachDetail(generics.RetrieveUpdateDestroyAPIView):
	queryset = Coach.objects.all()
	serializer_class = CoachSerializer

#########################################################################
#
#	OVERRIDING ObtainAuthToken PARA QUE ELE RETORNE O USUARIO TB E NAO SO O TOKEN AO LOGAR
#


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
		
		# Tem que serializar o user pq senao vai dar:
		# TypeError at /api-token-auth/↵<User: rani> is not JSON serializable
		# ao fazer a requisicao
		print(token)
		user_serialized = UserSerializer(token.user)

		# Nao vou dar todas as informacoes do User para o front-end!
		# Aqui eu limito o que vou passar
		user = {"username": user_serialized.data['username'], "email": user_serialized.data['email'],
		"first_name": user_serialized.data['first_name'], "last_name": user_serialized.data['last_name'],
		"id": user_serialized.data['id']}
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

# Create your views here.

# format=None -> esse parametro eh opcional para dizer qual o formato que queremos que retorne. Ex: .json
# @api_view(['GET', 'POST'])
# def ingrediente_list(request, format=None):

# 	if request.method == 'GET':
# 		ingredientes = Ingrediente.objects.all()
# 		serializer = IngredienteSerializer(ingredientes, many=True)
# 		return Response(serializer.data)

# 	elif request.method == 'POST':
# 		serializer = IngredienteSerializer(data=request.data)
# 		if serializer.is_valid():
# 			# Salvando o objeto no banco
# 			serializer.save()
# 			return Response(serializer.data, status=status.HTTP_201_CREATED)
# 		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['GET', 'PUT', 'DELETE'])
# def ingrediente_detail(request, pk, format=None):

# 	try:
# 		ingrediente = Ingrediente.objects.get(pk=pk)
# 	except Ingrediente.DoesNotExist:
# 		return Response(status=status.HTTP_404_NOT_FOUND)


# 	if request.method == 'GET':		
# 		serializer = IngredienteSerializer(ingrediente)
# 		return Response(serializer.data)

# 	elif request.method == 'PUT':
# 		serializer = IngredienteSerializer(ingrediente, data=request.data)
# 		if serializer.is_valid():
# 			serializer.save()
# 			return Response(serializer.data)
# 		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# 	elif request.method == 'DELETE':
# 		ingrediente.delete()
# 		return Response(status=status.HTTP_204_NO_CONTENT)


# @api_view(['GET', 'POST'])
# def receita_list(request, format=None):

# 	if request.method == 'GET':
# 		receitas = Receita.objects.all()
# 		serializer = ReceitaSerializer(receitas, many=True)
# 		return Response(serializer.data)

# 	elif request.method == 'POST':
# 		serializer = ReceitaSerializer(data=request.data)
# 		if serializer.is_valid():
# 			# Salvando o objeto no banco
# 			serializer.save()
# 			return Response(serializer.data, status=status.HTTP_201_CREATED)
# 		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['GET', 'PUT', 'DELETE'])
# def receita_detail(request, pk, format=None):

# 	try:
# 		receita = Receita.objects.get(pk=pk)
# 	except Receita.DoesNotExist:
# 		return Response(status=status.HTTP_404_NOT_FOUND)


# 	if request.method == 'GET':		
# 		serializer = ReceitaSerializer(receita)
# 		return Response(serializer.data)

# 	elif request.method == 'PUT':
# 		serializer = ReceitaSerializer(receita, data=request.data)
# 		if serializer.is_valid():
# 			serializer.save()
# 			return Response(serializer.data)
# 		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# 	elif request.method == 'DELETE':
# 		receita.delete()
# 		return Response(status=status.HTTP_204_NO_CONTENT)
