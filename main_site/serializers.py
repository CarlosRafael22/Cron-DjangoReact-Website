from rest_framework import serializers
from .models import Ingrediente, Receita, Passo_da_Receita, Parte_da_Receita
import json

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

class ReceitaSerializer(serializers.ModelSerializer):
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



# data2 = {
# 	'ingredientes': [{'nome_ingrediente': "150 g de farinha de trigo (1 xícara cheia)"}, {'nome_ingrediente': "1 colher de chá de fermento em pó"}],
# 	'modo_de_preparo': [{'descricao': "Misturar a manteiga, levar por mais 30 segundos"},
# 	{'descricao': "Misture"}]
# }