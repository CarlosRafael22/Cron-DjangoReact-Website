from django.test import TestCase
from main_site.models import Porcao, Refeicao, Log_Refeicao, Diario_Alimentar, Paciente, Perfil
from django.contrib.auth.models import User
from datetime import datetime
from django.utils import timezone

# Create your tests here.

class PorcaoTest(TestCase):

	def setUp(self):
		Porcao.objects.create(ingrediente="2 conchas de Feijao comum")
		Porcao.objects.create(ingrediente="2 colheres de arroz")

	def test_porcao(self):
		p1 = Porcao.objects.get(id=1)
		self.assertTrue(isinstance(p1, Porcao))
		self.assertTrue("conchas" in p1.ingrediente)

		p2 = Porcao.objects.get(id=2)
		self.assertTrue(isinstance(p2, Porcao))
		self.assertTrue("colheres" in p2.ingrediente)

class RefeicaoTest(TestCase):

	def setUp(self):
		p1 = Porcao.objects.create(ingrediente="2 pedaços pequenos de carne")
		p2  = Porcao.objects.create(ingrediente="2 colheres de feijao")

		r = Refeicao.objects.create(nome_refeicao="Almoço")
		r.porcoes.add(p1,p2)
		r.save()

	def test_refeicao(self):
		r1 = Refeicao.objects.get(id=1)
		self.assertTrue(isinstance(r1, Refeicao))
		self.assertEqual(r1.porcoes.count(), 2)

class Log_RefeicaoTest(TestCase):

	def setUp(self):
		p1 = Porcao.objects.create(ingrediente="2 pedaços pequenos de carne")
		p2  = Porcao.objects.create(ingrediente="2 colheres de feijao")

		r = Refeicao.objects.create(nome_refeicao="Almoço")
		r.porcoes.add(p1,p2)
		r.save()

		# Criando o diario alimentar para usar no log
		# Tem que adicionar um paciente para usa-lo no Diario
		user = User.objects.create_user(username="augusta", email="augusta@hotmail.com", password="augustaword")
		perfil = Perfil.objects.create(user=user)
		augusta = Paciente.objects.create(perfil=perfil)

		diario = Diario_Alimentar.objects.create(participante=augusta)

		# Log_Refeicao.objects.create(refeicao=r, local="Casa", satisfacao="Saciada")

	def test_logRefeicaoDataSetada(self):
		d1 = Diario_Alimentar.objects.get(id=1)
		self.assertTrue(isinstance(d1, Diario_Alimentar))

		r = Refeicao.objects.get(id=1)
		
		log1 = Log_Refeicao.objects.create(refeicao=r, local="Casa", satisfacao="Saciada", diario_alimentar=d1, data_hora="16/03/17 10:50")
		self.assertEqual(log1.refeicao.porcoes.count(), 2)
		self.assertTrue(log1.data_hora, datetime(2017, 3, 16, 10, 50))

	def test_logRefeicaoDataAutomatica(self):
		d1 = Diario_Alimentar.objects.get(id=1)
		self.assertTrue(isinstance(d1, Diario_Alimentar))

		r = Refeicao.objects.get(id=1)

		log1 = Log_Refeicao.objects.create(refeicao=r, local="Casa", satisfacao="Saciada", diario_alimentar=d1)
		self.assertEqual(log1.refeicao.porcoes.count(), 2)
		self.assertTrue(log1.data_hora is not None)



class Diario_AlimentarTest(TestCase):

	def setUp(self):
		p1 = Porcao.objects.create(ingrediente="2 pedaços pequenos de carne")
		p2  = Porcao.objects.create(ingrediente="2 colheres de feijao")

		r = Refeicao.objects.create(nome_refeicao="Almoço")
		r.porcoes.add(p1,p2)
		r.save()

		# Criando o diario alimentar para usar no log
		# Tem que adicionar um paciente para usa-lo no Diario
		user = User.objects.create_user(username="augusta", email="augusta@hotmail.com", password="augustaword")
		perfil = Perfil.objects.create(user=user)
		augusta = Paciente.objects.create(perfil=perfil)

		diario = Diario_Alimentar.objects.create(participante=augusta)

		Log_Refeicao.objects.create(refeicao=r, local="Casa", satisfacao="Saciada", diario_alimentar = diario)

		# Diario_Alimentar.objects.create(par)

	def test_DiarioTemLog(self):
		log1 = Log_Refeicao.objects.get(id=1)
		diario = Diario_Alimentar.objects.get(id=1)
		augusta = Paciente.objects.get(id=1)

		self.assertTrue(log1 in diario.logs_refeicoes.all())
		self.assertEqual(diario.participante, augusta)
