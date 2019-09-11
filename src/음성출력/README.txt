[레시피봇 음성출력용 파일]

1. mp3 폴더

- 각 mp3 파일은 Naver Clova API 사용함.
- 이름 형식은 recipe테이블 id_step넘버
 ex) id가 2번인 recipe테이블의 row의 steps열 안에 2단계
 --> 2_2.mp3

2 tts파일
: 데이터베이스에서 recipe테이블의 각 단계별로 음성 파일을 저장하게 하는 코드
 (row 개수 만큼 반복하도록 코드 짬)
: 네이버 클로바 sample 코드 참고함. 
(CSS 서비스 종료 ㅠㅠㅠ)