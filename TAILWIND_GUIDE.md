# Tailwind CSS 설치 및 사용법 가이드

## 개요

Tailwind CSS는 유틸리티 우선 CSS 프레임워크로, 미리 정의된 클래스들을 조합하여 빠르게 스타일링할 수 있습니다. Next.js와 함께 사용할 때 매우 효과적입니다.

## 설치 방법

### 1. 패키지 설치

```bash
# yarn 사용
yarn add -D tailwindcss postcss autoprefixer @tailwindcss/postcss

# npm 사용
npm install -D tailwindcss postcss autoprefixer @tailwindcss/postcss
```

### 2. 설정 파일 생성

#### tailwind.config.js 생성

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // 커스텀 테마 확장
      colors: {
        primary: '#3B82F6',
        secondary: '#10B981',
      },
      spacing: {
        '128': '32rem',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

#### postcss.config.js 생성

```javascript
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}
```

### 3. CSS 파일에 디렉티브 추가

`src/app/globals.css` 또는 메인 CSS 파일에 다음을 추가:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 기본 사용법

### 1. 레이아웃 클래스

```html
<!-- 컨테이너 -->
<div class="container mx-auto px-4">
  <!-- 내용 -->
</div>

<!-- Flexbox -->
<div class="flex items-center justify-between">
  <div>왼쪽</div>
  <div>오른쪽</div>
</div>

<!-- Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div>아이템 1</div>
  <div>아이템 2</div>
  <div>아이템 3</div>
</div>

<!-- 반응형 디자인 -->
<div class="w-full md:w-1/2 lg:w-1/3">
  <!-- 모바일: 전체 너비, 태블릿: 절반, 데스크톱: 1/3 -->
</div>
```

### 2. 색상 및 배경

```html
<!-- 텍스트 색상 -->
<p class="text-red-500">빨간색 텍스트</p>
<p class="text-blue-600 hover:text-blue-800">호버 효과</p>

<!-- 배경 색상 -->
<div class="bg-gray-100">회색 배경</div>
<div class="bg-gradient-to-r from-blue-500 to-purple-600">그라데이션</div>

<!-- 투명도 -->
<div class="bg-black bg-opacity-50">반투명 배경</div>
```

### 3. 간격 및 패딩

```html
<!-- 마진 -->
<div class="m-4">모든 방향 마진</div>
<div class="mt-4 mb-2 ml-3 mr-1">개별 방향 마진</div>
<div class="mx-auto">가운데 정렬</div>

<!-- 패딩 -->
<div class="p-4">모든 방향 패딩</div>
<div class="pt-4 pb-2 pl-3 pr-1">개별 방향 패딩</div>
```

### 4. 텍스트 스타일링

```html
<!-- 폰트 크기 -->
<h1 class="text-4xl">큰 제목</h1>
<p class="text-lg">큰 텍스트</p>
<p class="text-sm">작은 텍스트</p>

<!-- 폰트 굵기 -->
<p class="font-bold">굵은 텍스트</p>
<p class="font-semibold">중간 굵기</p>
<p class="font-light">얇은 텍스트</p>

<!-- 텍스트 정렬 -->
<p class="text-center">가운데 정렬</p>
<p class="text-left">왼쪽 정렬</p>
<p class="text-right">오른쪽 정렬</p>

<!-- 텍스트 변환 -->
<p class="uppercase">대문자</p>
<p class="lowercase">소문자</p>
<p class="capitalize">첫 글자만 대문자</p>
```

### 5. 테두리 및 그림자

```html
<!-- 테두리 -->
<div class="border border-gray-300">기본 테두리</div>
<div class="border-2 border-blue-500 rounded">둥근 모서리</div>
<div class="border-l-4 border-green-500">왼쪽 테두리</div>

<!-- 그림자 -->
<div class="shadow">기본 그림자</div>
<div class="shadow-lg">큰 그림자</div>
<div class="shadow-xl hover:shadow-2xl">호버 시 그림자 확대</div>
```

## 고급 기능

### 1. 반응형 디자인

```html
<!-- 브레이크포인트 -->
<div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
  <!-- sm: 640px 이상, md: 768px 이상, lg: 1024px 이상 -->
</div>

<!-- 숨기기/보이기 -->
<div class="hidden md:block">데스크톱에서만 보임</div>
<div class="block md:hidden">모바일에서만 보임</div>
```

### 2. 호버 및 포커스 상태

```html
<button class="bg-blue-500 hover:bg-blue-700 focus:ring-2 focus:ring-blue-300">
  호버 및 포커스 효과
</button>

<div class="transform hover:scale-105 transition-transform">
  호버 시 확대
</div>
```

### 3. 애니메이션

```html
<!-- 기본 애니메이션 -->
<div class="animate-spin">회전</div>
<div class="animate-pulse">깜빡임</div>
<div class="animate-bounce">바운스</div>

<!-- 커스텀 애니메이션 -->
<div class="animate-ping">핑 효과</div>
```

### 4. 커스텀 컴포넌트

```css
/* globals.css에 추가 */
@layer components {
  .btn-primary {
    @apply px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors;
  }
  
  .card {
    @apply bg-white rounded-lg shadow-md p-6;
  }
}
```

```html
<!-- 사용 -->
<button class="btn-primary">버튼</button>
<div class="card">카드 내용</div>
```

## 유틸리티 클래스 참조

### 레이아웃
- `container`: 컨테이너
- `block`, `inline-block`, `inline`: 디스플레이
- `flex`, `grid`: 레이아웃 모드
- `hidden`, `visible`: 가시성

### Flexbox
- `flex-row`, `flex-col`: 방향
- `justify-start`, `justify-center`, `justify-end`, `justify-between`: 주축 정렬
- `items-start`, `items-center`, `items-end`: 교차축 정렬
- `flex-wrap`, `flex-nowrap`: 줄바꿈

### Grid
- `grid-cols-1`, `grid-cols-2`, `grid-cols-3`: 열 수
- `grid-rows-1`, `grid-rows-2`: 행 수
- `gap-1`, `gap-2`, `gap-4`: 간격
- `col-span-1`, `row-span-1`: 확장

### 간격
- `m-0` ~ `m-16`: 마진
- `p-0` ~ `p-16`: 패딩
- `space-x-1` ~ `space-x-8`: 요소 간 간격
- `space-y-1` ~ `space-y-8`: 세로 간격

### 색상
- `text-{color}-{shade}`: 텍스트 색상
- `bg-{color}-{shade}`: 배경 색상
- `border-{color}-{shade}`: 테두리 색상

### 크기
- `w-{size}`, `h-{size}`: 너비/높이
- `max-w-{size}`, `max-h-{size}`: 최대 크기
- `min-w-{size}`, `min-h-{size}`: 최소 크기

## 모범 사례

### 1. 컴포넌트 기반 접근

```jsx
// Button.jsx
export function Button({ children, variant = 'primary', ...props }) {
  const baseClasses = 'px-4 py-2 rounded font-medium transition-colors'
  const variants = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    danger: 'bg-red-500 text-white hover:bg-red-600',
  }
  
  return (
    <button 
      className={`${baseClasses} ${variants[variant]}`} 
      {...props}
    >
      {children}
    </button>
  )
}
```

### 2. 반응형 디자인

```jsx
function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <h1 className="text-xl font-bold">로고</h1>
            <div className="hidden md:flex space-x-4">
              <a href="#" className="hover:text-blue-600">홈</a>
              <a href="#" className="hover:text-blue-600">서비스</a>
              <a href="#" className="hover:text-blue-600">연락처</a>
            </div>
            <button className="md:hidden">메뉴</button>
          </nav>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 카드들 */}
        </div>
      </main>
    </div>
  )
}
```

### 3. 다크 모드 지원

```jsx
// tailwind.config.js
module.exports = {
  darkMode: 'class', // 또는 'media'
  // ...
}

// 사용
<div className="bg-white dark:bg-gray-900 text-black dark:text-white">
  다크 모드 지원
</div>
```

## 디버깅 및 도구

### 1. 브라우저 개발자 도구
- 클래스 검사
- 반응형 미리보기
- 색상 피커

### 2. VS Code 확장
- Tailwind CSS IntelliSense
- PostCSS Language Support

### 3. 유용한 웹사이트
- [Tailwind CSS 공식 문서](https://tailwindcss.com/docs)
- [Tailwind UI](https://tailwindui.com/)
- [Heroicons](https://heroicons.com/)

## 성능 최적화

### 1. PurgeCSS 설정
```javascript
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  // 사용하지 않는 클래스 자동 제거
}
```

### 2. JIT 모드 (v3+)
```javascript
// tailwind.config.js
module.exports = {
  mode: 'jit', // Just-In-Time 모드
  // ...
}
```

## 결론

Tailwind CSS는 빠른 개발과 일관된 디자인을 위한 강력한 도구입니다. 유틸리티 클래스를 조합하여 복잡한 레이아웃도 쉽게 만들 수 있으며, 커스터마이징도 자유롭습니다.

이 가이드를 참고하여 프로젝트에 Tailwind CSS를 적용해보세요! 