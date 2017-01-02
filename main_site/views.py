from django.shortcuts import render

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Ingrediente, Receita, Passo_da_Receita, Parte_da_Receita, Foto_Receita
from .serializers import IngredienteSerializer, ReceitaSerializer, Passo_da_ReceitaSerializer, Parte_da_ReceitaSerializer, Foto_ReceitaSerializer

from rest_framework import generics
from rest_framework.decorators import parser_classes
from rest_framework.parsers import MultiPartParser, FormParser

from django.views.decorators.csrf import csrf_exempt

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
def render_home(request):
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
