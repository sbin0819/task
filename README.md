# Tech Stack

- React
- Next
- react-query
- axios
- radix/ui
- tailwindcss
- jotai

---

# 설치 및 실행

**pnpm 설치**

pnpm이 설치되어 있지 않은 경우, 다음 명령어를 사용하여 pnpm을 글로벌로 설치하세요:

```bash
npm install -g pnpm
```

**설치**

```bash
pnpm install
```

**실행**

```bash
pnpm dev
```

**배포 확인**

pnpm 및 node 환경에 따라 설치 문제 대비로 배포해두었습니다.

https://task-tau-gules.vercel.app/login

login 은 `src/shared/data/user_list.json` 의 userEmail 을 활용하시면 됩니다.

---

# QA

## 로그인 및 로그아웃

**로그인**

- /login 위치에서 `user_list.json` 의 email 입력창에 `userEmail` 을 입력하고 password 에 한 글자 이상을 입력하고 login-in 버튼을 누른다.
  - userRole 별로 `user_list.json` 은 참고 해서 로그인을 하면 된다
  - 로그인이 되면 / 으로 리다이렉트 된다.
    - userRole 이 Viewer 이면 /tasks 로 리다이렉트 된다.

**로그아웃**

- `/`, `/tasks` 위치에 오른쪽 상단 dropdown 을 클릭하면 로그아웃 버튼이 나온다.
- 로그아웃 버튼을 누르면 로그아웃이 되고 /login 으로 redirect

## 테이블

**검색**

- `dropdown` 을 통해서 필드를 선택하고 input 박스에서 검색을 한 뒤 엔터 클릭 혹인 검색 아이콘 클릭시 해당 필드를 통해서 테이블 내에 검색이 이루어진다.

**체크박스 선택**

- 체크 박스가 선택 된 필드의 테이블 값들이 노출 된다.
- 모든 체크 박스가 선택시 `All` 체크 박스가 체크 된다.
- 체크 박스가 하나라도 선택 되지 않으면 `All` 체크 박스가 해제 된다.
- 모든 체크 박스가 선택된 상황에서 `All` 체크 박스를 해제하면 모든 체크 박스가 해제 된다.
- `All` 체크 박스가 해제 된 상태에서 `All` 체크 박스를 선택하면 모든 체크 박스가 선택 된다.

**테이블 헤더 정렬**

- 테이블 헤더에 아이콘 위치에서 클릭시
  - 체크 박스 한 번 클릭시 Ascending 으로 정렬
  - 체크 박스 두 번 클릭시 Descending 으로 정렬
  - 체크 박스 세 번 클릭시 정렬 해제
  - 체크 박스 활성화 시 (Ascending or Descending 상황)
    - 다른 헤더 정렬 버튼을 누르면 다른 헤더 박스의 필드를 기준으로 정렬 된다.

**테이블 노출**

- 테이블 데이터가 있으면 데이터 노출
- 테이블 데이터가 없으면 빈 값 노출

## User List

**페이지 진입 경로**

- 처음 로그인을 하면 기본으로 진입함 (Viewer 인 경우 Task List 로 진입 됨)
- 왼쪽 사이드바 영역에서 Users 클릭

**페이지 진입시**

- 검색 기본 값은 `User Name`
- 모든 체크박스 선택

**유저 별 권한**

- Admin

  - 모든 사용자 리스트가 노출
  - Invite User 버튼 활성화

- PrimeUser

  - 모든 사용자 리스트가 노출
  - Invite User 버튼 비활성화

- Regular User

  - 본인에 대한 정보만 볼 수 있음
  - 체크 박스 영역 (필터 영역 미노출)

- Viewer
  - 메뉴 접근 금지

## Task List

**페이지 진입 경로**

- 왼쪽 사이드바 영역에서 Tasks 클릭

**페이지 진입시**

- 검색 기본 값은 `Task Name`
- 모든 체크박스 선택

**유저 별 권한**

- Admin

  - 모든 Task 리스트가 노출
  - Create Task 버튼 활성화

- PrimeUser

  - 모든 Task 리스트가 노출
  - Create Task 버튼 활성화

- Regular User

  - 본인이 생성한 Task 리스트 노출
  - Create Task 버튼 활성화

- Viewer
  - 본인한테 할당된 Task 만 노출
  - Create Task 버튼 비활성화

### Create Task

**진입**

- Task List 에서 Admin, PrimeUser, RegularUser 일 때 Create Task 버튼 클릭

**종료**

- Cancel 버튼
- 모달 밖 영역 버튼 클릭
  - 데이터는 초기화

**공통 form 영역**

- 생성자

  - task 생성 본인

- Task Name

  - Task Name

- 담당자 지정

  - Admin
    - 모두 지정
  - PrimeUser
    - Admin 제외 모두 지정
  - RegularUser
    - 본인 자신만 지정

- Task Type
  - 택배 요청
  - 물품 구매

**택요 요청 form 영역**

- Task Type 이 택배 요청이어야 함
- 각 필드에 조건이 맞지 않으면 해당 input 필드의 색 빨간색 및 에러메시지 노출

- 수신자 명
  - 조건: 값이 있어야함
- 수신자 전화번호
  - 조건: `+82 010-xxxx-xxxx` or `010-xxxx-xxx` 타입이어야 한다.
- 수신자 주소
  - 조건: 입력값에 `텍스트` 와 `숫자`를 포함해야 한다.
- Due Date
  - 조건: `yyyy-mm-dd` 형태여야한다.

**물품 구매 form 영역**

- Task Type 이 물품 구매이어야 함
- 각 필드에 조건이 맞지 않으면 해당 input 필드의 색 빨간색 및 에러메시지 노출

- 물품명
  - 조건: 값이 있어야함
- 물품 갯수
  - 조건: `숫자`여야 하고, `0 보다 커야한다`.
- Due Date
  - 조건: `yyyy-mm-dd` 형태여야한다.

**생성 버튼**

- 모든 필드에 값이 있어야 하고 `택배 요청` or `물품 구매` 필드내에서 정의한 validation 을 통과 해야 활성화 된다.
