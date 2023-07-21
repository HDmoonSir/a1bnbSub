# 🖥 Programmers AI 데브코스 5기 A1BNB

### 소개

- We will create two `docker-compose` configuration files. One for development (easier version) and one for production (with SSL certificate from Let’s Encrypt).

- The React static files will be served by `nginx`.

- The Django static files (from admin and DRF browsable API) will be served by `nginx`.

- The `nginx` will be reverse-proxy to the Django server (`gunicorn`).

- In the production, we will add `certbot to renew the certificate. To issue a certificate we will use a bash script. You need to have a domain to issue the certificate .

### 🔥 팀원 소개 🔥

<table>
 <tr>
    <td align="center"><a href="https://github.com/rivertw777"><img src="https://avatars.githubusercontent.com/rivertw777" width="150px;" alt=""></td>
    <td align="center"><a href="https://github.com/tmdwo8814"><img src="https://avatars.githubusercontent.com/tmdwo8814" width="150px;" alt=""></td>
    <td align="center"><a href="https://github.com/huijunam"><img src="https://avatars.githubusercontent.com/huijunam" width="150px;" alt=""></td>
    <td align="center"><a href="https://github.com/HDmoonSir"><img src="https://avatars.githubusercontent.com/HDmoonSir" width="150px;" alt=""></td>
    <td align="center"><a href="https://github.com/movie5"><img src="https://avatars.githubusercontent.com/movie5" width="150px;" alt=""></td>
    <td align="center"><a href="https://github.com/sejeongak"><img src="https://avatars.githubusercontent.com/sejeongak" width="150px;" alt=""></td>
    <td align="center"><a href="https://github.com/mcjeong95"><img src="https://avatars.githubusercontent.com/mcjeong95" width="150px;" alt=""></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/rivertw777"><b>강태원</b></td>
    <td align="center"><a href="https://github.com/tmdwo8814"><b>김승재</b></td>
    <td align="center"><a href="https://github.com/huijunam"><b>남희주</b></td>
    <td align="center"><a href="https://github.com/HDmoonSir"><b>문희동</b></td>
    <td align="center"><a href="https://github.com/movie5"><b>오영화</b></td>
    <td align="center"><a href="https://github.com/sejeongak"><b>장세정</b></td>
    <td align="center"><a href="https://github.com/mcjeong95"><b>정민철</b></td>
  </tr>
  <tr> 
    <td align="center">모델개발</td>
    <td align="center">모델개발</td>
    <td align="center">모델개발</td>
    <td align="center">모델개발</td>
    <td align="center">모델개발</td>
    <td align="center">모델개발</td>
    <td align="center">모델개발</td>
  </tr>

</table>

## ⚠️ commit 규칙

> commit 규칙은 [gitmoji](https://gitmoji.dev/) 를 참고했습니다.

- "이모지 태그: {플랫폼} (문제 번호 문제 제목) {커밋 메시지}" 형태로 작성

### 예시

'♻️ refactor: server 코드 변경'

#### 이모지 및 태그

- 이모지는 선택에 따라 활용한다.

| 이모지 | 태그     | 설명                                  |
| :----- | :------- | :------------------------------------ |
| ✨     | feat     | 새로운 기능 추가                      |
| 🐛     | fix      | 버그 수정                             |
| ♻️     | refactor | 코드 리팩토링                         |
| ✏️     | comment  | 주석 추가(코드 변경 X) 혹은 오타 수정 |
| 📝     | docs     | README와 같은 문서 수정               |
| 🔀     | merge    | merge                                 |
| 🚚     | rename   | 파일, 폴더명 수정 혹은 이동           |
