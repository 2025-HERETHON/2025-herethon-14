from django.db import models

class Timelog(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    date = models.DateField()

    def __str__(self):
        return f'[{self.date}] {self.title}'
    