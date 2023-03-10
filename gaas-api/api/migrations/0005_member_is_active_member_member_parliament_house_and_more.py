# Generated by Django 4.0.3 on 2023-02-26 17:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_merge_0002_proposal_comment_0003_user_photo'),
    ]

    operations = [
        migrations.AddField(
            model_name='member',
            name='is_active_member',
            field=models.CharField(max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='member',
            name='parliament_house',
            field=models.CharField(max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='member',
            name='party_name',
            field=models.CharField(max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='member',
            name='photo',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
        migrations.AddField(
            model_name='user',
            name='is_candidate',
            field=models.BooleanField(default=True),
        ),
    ]
