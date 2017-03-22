from django.test import TestCase
from main_site.models import Porcao, Refeicao, Log_Refeicao, Diario_Alimentar, Paciente, Perfil
from main_site.serializers import PorcaoSerializer, RefeicaoSerializer
from django.contrib.auth.models import User
from datetime import datetime
from django.utils import timezone

class PorcaoTest(TestCase):

	def setUp(self):

		self.porcao_attributes = {
			'quantidade' : '3 pedaços pequenos',
			'ingrediente' : 'de frango grelhado'
		}

		self.serializer_data = {
			'quantidade' : '2 conchas',
			'ingrediente' : 'de arroz'
		}

		self.porcao = Porcao.objects.create(**self.porcao_attributes)
		# self.serializer = PorcaoSerializer(instance=self.porcao)
		self.serializer =  PorcaoSerializer(data=self.porcao_attributes)

	def test_constains_expected_fields(self):
		is_valid = self.serializer.is_valid()
		data = self.serializer.initial_data

		# import pdb;
		# pdb.set_trace();
		self.assertTrue(is_valid)
		self.assertEqual(set(data.keys()), set(['quantidade', 'ingrediente']))

	def test_quantidade_field_content(self):
		is_valid = self.serializer.is_valid()
		data = self.serializer.initial_data

		self.assertTrue(is_valid)
		self.assertEqual(data['quantidade'], self.porcao_attributes['quantidade'])

	def test_ingrediente_field_content(self):
		is_valid = self.serializer.is_valid()
		data = self.serializer.initial_data

		self.assertTrue(is_valid)
		self.assertEqual(data['ingrediente'], self.porcao_attributes['ingrediente'])


class Diario_AlimentarTest(TestCase):

	def setUp(self):
		import pdb;
		pdb.set_trace();

		self.porcao_attributes = {
			'quantidade' : '3 pedaços pequenos',
			'ingrediente' : 'de frango grelhado'
		}

		self.serializer_data = {
			'quantidade' : '2 conchas',
			'ingrediente' : 'de arroz'
		}

		self.porcao = Porcao.objects.create(**self.porcao_attributes)
		# self.serializer = PorcaoSerializer(instance=self.porcao)
		self.serializer =  PorcaoSerializer(data=self.porcao_attributes)

	def test_constains_expected_fields(self):
		is_valid = self.serializer.is_valid()
		data = self.serializer.initial_data

		# import pdb;
		# pdb.set_trace();
		self.assertTrue(is_valid)
		self.assertEqual(set(data.keys()), set(['quantidade', 'ingrediente']))



# class RefeicaoTest(TestCase):

# 	def setUp(self):

# 		self.porcao_attributes1 = {
# 			'quantidade' : '3 pedaços pequenos',
# 			'ingrediente' : 'de frango grelhado'
# 		}

# 		self.porcao_attributes2 = {
# 			'quantidade' : '2 conchas',
# 			'ingrediente' : 'de arroz'
# 		}

# 		self.porcao1 = Porcao.objects.create(**self.porcao_attributes1)
# 		self.porcao2 = Porcao.objects.create(**self.porcao_attributes2)

# 		self.refeicao_attributes = {
# 			'nome_refeicao' : 'Almoço'
# 		}

# 		self.refeicao = Refeicao.objects.create(**self.refeicao_attributes)
# 		self.refeicao.porcoes.add(self.porcao1, self.porcao2)

# 		# To passando o proprio objeto sem setar (data= ) ou (instance= )
# 		# pq eh assim q tamos usando o serializer no views.py, so para transformar o objeto em JSON e mandar como resposta a requisicao
# 		self.serializer = RefeicaoSerializer(self.refeicao)

# 	def test_refeicao_has_porcoes(self):
# 		is_valid  = self.serializer.is_valid()
# 		data = self.serializer.initial_data

# 		import pdb;
# 		pdb.set_trace();
		




