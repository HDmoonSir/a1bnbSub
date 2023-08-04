from djongo import models


class Post(models.Model):

    # 포스트 pk
    postId = models.AutoField(primary_key=True)

    # 작성자 이름
    userId = models.CharField(max_length=10)

    # 포스트 제목
    title = models.CharField(max_length=100)

    # 사진 1 ~ 10
    photos = models.JSONField()

    # 분류 결과
    classifications = models.JSONField()

    # 오브젝트 인식 결과
    detections = models.JSONField()

    # 섬네일 소개글(photos[0])
    caption = models.TextField(max_length=500)

    # 어메니티 리스트
    ammenities = models.TextField(max_length=500)

    class Meta:
        db_table = 'posts' # MongoDB에서 사용될 컬렉션 이름
