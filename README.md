# 🚀 같이가요 _ FE 
## 목차
1. 팀원소개
2. 프로젝트 소개
3. Archiecture
4. ERD
5. 기술스택
6. API 명세서
7. Wireframe + flowchart
8. Project Structure
9. 주요기능 + 영상시연
---
    


## 🧑‍🤝‍🧑 팀원소개
<table>
  <tbody>
    <tr>
    <td align="center"><a href="https://github.com/ITK-SHIN"><img src="https://github.com/zerobase-I/GoTogether-FE/assets/105304446/355b6aed-d51d-4e1b-a71a-56f213bdeca1" width="150px;" height='150px' alt=""/><br /><sub><b>FE 팀원 : 신상우</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/Luison1472"><img src="https://github.com/zerobase-I/GoTogether-FE/assets/105304446/24976a91-9fba-4649-8122-49901103d2a0" width="150px;" height='150px'" alt=""/><br /><sub><b>FE 팀원 : 박민서</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/2JeongwooLee?tab=overview&from=2024-05-01&to=2024-05-08"><img src="https://github.com/zerobase-I/GoTogether-FE/assets/105304446/83c7d0a9-7839-4ae3-8288-ea749a1f5928"  width="150px;" height='150px' alt=""/><br /><sub><b>BE 팀장 : 이정우</b></sub></a><br /></td>
      <td align="center"><a href="https://github.com/Namgyu11"><img src="https://github.com/zerobase-I/GoTogether-FE/assets/105304446/905e26d9-0c45-4b89-95a9-5d3a13d8925a"  width="150px;" height='150px' alt=""/><br /><sub><b>BE 팀원 : 하남규</b></sub></a><br /></td>
      <td align="center"><a href="https://github.com/qoreh?tab=overview&from=2024-05-01&to=2024-05-08"><img src="https://github.com/zerobase-I/GoTogether-FE/assets/105304446/bf94de77-d631-465b-94a5-7a602283d0f3"  width="150px;" height='150px' alt=""/><br /><sub><b>BE 팀원 : 양수경</b></sub></a><br /></td>
    </tr>
  </tbody>
</table>

## 🚩 FE_ 역할분담
✅ 공통
- Figma 를 통한 wireframe 작업 
- 반응형 구현 (480px , 768px, 1200px)
  
   
🤵🏼 신상우의 기능구현
1. 게시글 CRUD
2. 동행요청/취소  (게시글 상세페이지)
3. 알림요청/응답 + 동행후기
4. 게시글 필터 (recoil 통한 filter item 설정)
5. 다른회원 정보확인 페이지
6. react-router v6.22.1로 전체적 라우팅 설정

🤵🏼 박민서의 기능구현
1. 일반 회원가입
2. 일반 로그인
3. 카카오 로그인 및 회원가입
4. 채팅방
5. home _ protected Route 설정
6. 프로필 수정
7. 비밀번호 재설정
8. Recoil Token, UserDetail 전역 상태 지정


## 🍀 프로젝트 소개
같이가요는 여행을 함께 하고 싶은 사람들을 찾아 여행을 떠나는 컨셉의 웹앱입니다! 

✅  여행지, 일정, 성별 등 여러 조건을 고려하여 적절한 동행자를 찾아보세요.

✅  실시간 채팅으로 여러 사람들과 소통하며 정보를 공유하고 계획을 만들어보세요.

✅  이벤트 발생 시 알림으로 요청, 수락, 메시지 등 중요한 정보를 놓치지 않고 확인해보세요.

✅  여행이 종료된 후 동행후기를 남겨보세요.

## ⚓ Archiecture
![같이가요아키텍쳐](https://github.com/zerobase-I/GoTogether-FE/assets/105304446/4a0d86a4-1f99-4d97-8634-28cf86def6c0)

## ERD 
![같이가요ERD](https://github.com/zerobase-I/GoTogether-FE/assets/105304446/5a3f0346-4428-4146-af31-e3c5be66d472)

## 🛰 기술 스택
### Front-End
<div>
<img src="https://img.shields.io/badge/React-색상?style=for-the-badge&logo=React&logoColor=white">
<img src="https://img.shields.io/badge/Recoil-green?style=for-the-badge&logo=Recoil&logoColor=white">
<img src="https://img.shields.io/badge/React Query-blue?style=for-the-badge&logo=React Query&logoColor=white">
<img src="https://img.shields.io/badge/JavaScript-black?style=for-the-badge&logo=JavaScript&logoColor=white">
</div>
<div>
<img src="https://img.shields.io/badge/TailwindCSS-yellow?style=for-the-badge&logo=TailwindCSS&logoColor=white">
<img src="https://img.shields.io/badge/DaisyUI-red?style=for-the-badge&logo=DaisyUI&logoColor=white">
<img src="https://img.shields.io/badge/MSW-6464CD?style=for-the-badge&logo=MSW&logoColor=white">
<img src="https://img.shields.io/badge/Axios-5AD18F?style=for-the-badge&logo=Axios&logoColor=white">
</div>

### Production & deploy
<div>
<img src="https://img.shields.io/badge/Vercel-red?style=for-the-badge&logo=Vercel&logoColor=white">
<img src="https://img.shields.io/badge/github-black?style=for-the-badge&logo=github&logoColor=white">
</div>

### Collaboration tool
<div>
<img src="https://img.shields.io/badge/slack-black?style=for-the-badge&logo=slack&logoColor=white">
<img src="https://img.shields.io/badge/notion-black?style=for-the-badge&logo=notion&logoColor=white">
</div>

## API 명세서
https://www.notion.so/API-7cc78ca1be34401586f87aba532b82c9?pvs=4

## Wireframe + flowchart
https://www.canva.com/design/DAF9Urai_p4/XhBa4EbFF7rxAkbj3yWFRQ/edit?utm_content=DAF9Urai_p4&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton

## 📜 주요 기능
* 전체 기능 요약
  
회원가입 / 로그인 / 채팅방

게시글(CRUD) / 동행요청/취소 / 알림 + 동행 후기 / 게시글 필터 / 다른사람 정보확인

반응형

### Create + Update / DELETE / pagenation 구현 (순서대로)

<div>
 <img src="https://github.com/zerobase-I/GoTogether-BE/assets/105304446/34873e9c-db1b-4ce8-a6f4-a72e2c815da0" width="300px" align="center"/>
 <img src="https://github.com/zerobase-I/GoTogether-BE/assets/105304446/cfdaab48-3079-4c48-a172-8c6144cecb33" width="300px"/>
 <img src="https://github.com/zerobase-I/GoTogether-BE/assets/105304446/872d2faf-4fce-4bdd-82a5-9213db5b4d69" width="300px"/>
</div>


### filter 기능 / 다른사람정보보기 / 동행요청 + 취소 (순서대로)

<div>
 <img src="https://github.com/zerobase-I/GoTogether-BE/assets/105304446/0c68addf-5c14-48cc-a48c-7bf700d1c8ed" width="300px"/>
 <img src="https://github.com/zerobase-I/GoTogether-BE/assets/105304446/679600be-e086-4e2a-96ea-d444c0f3fb75" width="300px"/>
 <img src="https://github.com/zerobase-I/GoTogether-BE/assets/105304446/368a6937-c227-4f2f-9d23-812f69df29bb" width="300px"/>
</div>


### 동행후기남기기 / 반응형 (순서대로)

<div>
 <img src="https://github.com/zerobase-I/GoTogether-BE/assets/105304446/e43d8755-c894-49bc-b9ae-068ac00ae7e4" width="500px"/>
 <img src="https://github.com/zerobase-I/GoTogether-BE/assets/105304446/a8f4d8b5-394f-47ba-a154-fac24b3d4708" width="500px"/>
</div>




