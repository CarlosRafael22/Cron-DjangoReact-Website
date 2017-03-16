from django.test import TestCase
from main_site.models import Porcao, Refeicao, Log_Refeicao, Diario_Alimentar

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

# class Log_RefeicaoTest(TestCase):

# 	def setUp(self):
# 		p1 = Porcao.objects.create(ingrediente="2 pedaços pequenos de carne")
# 		p2  = Porcao.objects.create(ingrediente="2 colheres de feijao")

# 		r = Refeicao.objects.create(nome_refeicao="Almoço")
# 		r.porcoes.add(p1,p2)
# 		r.save()

# 		Log_Refeicao.objects.create(refeicao=r, local="Casa", satisfacao="Saciada")

# 	def test_logRefeicao(self):
# 		log1 = Log_Refeicao.objects.get(id=1)
# 		self.assertTrue(isinstance(log1, Log_Refeicao))
# 		self.assertEqual(log1.refeicao.porcoes.count(), 2)
# 		self.assertEqual(log1.refeicao.nome_refeicao, "Almoço")

# class Diario_AlimentarTest(TestCase):

# 	def setUp(self):
# 		p1 = Porcao.objects.create(ingrediente="2 pedaços pequenos de carne")
# 		p2  = Porcao.objects.create(ingrediente="2 colheres de feijao")

# 		r = Refeicao.objects.create(nome_refeicao="Almoço")
# 		r.porcoes.add(p1,p2)
# 		r.save()

# 		Log_Refeicao.objects.create(refeicao=r, local="Casa", satisfacao="Saciada")

# 		# Diario_Alimentar.objects.create(par)

# 	def test_logRefeicao(self):
# 		log1 = Log_Refeicao.objects.get(id=1)
# 		self.assertTrue(isinstance(log1, Log_Refeicao))
# 		self.assertEqual(log1.refeicao.porcoes.count(), 2)
# 		self.assertEqual(log1.refeicao.nome_refeicao, "Almoço")
