# Zustand 사용법 가이드

## 개요

Zustand는 React를 위한 작고 빠르고 확장 가능한 상태 관리 라이브러리입니다. Redux나 MobX와 달리 보일러플레이트가 거의 없고 TypeScript 지원이 우수합니다.

## 설치

```bash
yarn add zustand
```

## 기본 사용법

### 1. 간단한 스토어 생성

```typescript
import { create } from 'zustand'

interface CounterState {
  count: number
  increment: () => void
  decrement: () => void
  reset: () => void
}

export const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}))
```

### 2. 컴포넌트에서 사용

```typescript
import { useCounterStore } from './store/useCounterStore'

function Counter() {
  const { count, increment, decrement, reset } = useCounterStore()

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  )
}
```

## 고급 기능

### 1. 미들웨어 사용 (persist)

로컬 스토리지에 상태를 저장하려면 `persist` 미들웨어를 사용합니다:

```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserState {
  user: User | null
  isLoggedIn: boolean
  login: (user: User) => void
  logout: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      login: (user) => set({ user, isLoggedIn: true }),
      logout: () => set({ user: null, isLoggedIn: false }),
    }),
    {
      name: 'user-storage', // localStorage 키 이름
    }
  )
)
```

### 2. 상태 선택 (Selectors)

특정 상태만 구독하여 불필요한 리렌더링을 방지할 수 있습니다:

```typescript
// 전체 상태를 구독
const { count, increment } = useCounterStore()

// 특정 상태만 구독
const count = useCounterStore((state) => state.count)
const increment = useCounterStore((state) => state.increment)

// 여러 상태를 구독
const { count, name } = useCounterStore((state) => ({
  count: state.count,
  name: state.name,
}))
```

### 3. 상태 업데이트 방법

```typescript
// set은 create 함수의 콜백 함수의 첫 번째 매개변수로 전달됩니다
// 예시:
// create((set) => ({
//   ...store
// }))

// 직접 값 설정 - create의 콜백에서 받은 set 사용
set({ count: 10 })

// 이전 상태를 기반으로 업데이트 - state 매개변수로 현재 상태 접근
set((state) => ({ count: state.count + 1 }))

// 부분 업데이트 - 객체의 일부만 업데이트할 때
set((state) => ({ user: { ...state.user, name: 'New Name' } }))

// 비동기 업데이트 - 비동기 함수 내에서도 set 사용 가능
const fetchUser = async () => {
  const user = await api.getUser()
  set({ user })
}
```

### 4. 스토어 내부에서 다른 상태 접근

```typescript
export const useStore = create((set, get) => ({
  count: 0,
  increment: () => {
    const currentCount = get().count
    set({ count: currentCount + 1 })
  },
  reset: () => set({ count: 0 }),
}))
```

## 미들웨어

### 1. persist
로컬 스토리지에 상태를 저장합니다.

### 2. devtools
Redux DevTools와 연동합니다.

```typescript
import { devtools } from 'zustand/middleware'

export const useStore = create(
  devtools(
    (set) => ({
      // 스토어 로직
    }),
    { name: 'Store Name' }
  )
)
```

### 3. immer
불변성을 쉽게 관리할 수 있습니다.

```typescript
import { immer } from 'zustand/middleware/immer'

export const useStore = create(
  immer((set) => ({
    users: [],
    addUser: (user) =>
      set((state) => {
        state.users.push(user)
      }),
  }))
)
```

## TypeScript 지원

```typescript
interface State {
  count: number
  increment: () => void
}

// 타입 안전성 보장
export const useStore = create<State>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}))
```

## 모범 사례

### 1. 스토어 분리
관심사별로 스토어를 분리하세요:

```typescript
// userStore.ts
export const useUserStore = create<UserState>(...)

// cartStore.ts
export const useCartStore = create<CartState>(...)

// settingsStore.ts
export const useSettingsStore = create<SettingsState>(...)
```

### 2. 액션 네이밍
액션 함수명을 명확하게 작성하세요:

```typescript
// 좋은 예
const increment = () => set((state) => ({ count: state.count + 1 }))
const addToCart = (item: Item) => set((state) => ({ cart: [...state.cart, item] }))

// 피해야 할 예
const update = () => set(...)
const change = () => set(...)
```

### 3. 상태 정규화
복잡한 상태는 정규화하여 관리하세요:

```typescript
interface State {
  users: Record<string, User>
  posts: Record<string, Post>
  userPosts: Record<string, string[]>
}
```

## 디버깅

### 1. 상태 로깅
```typescript
const useStore = create((set, get) => ({
  count: 0,
  increment: () => {
    const newCount = get().count + 1
    console.log('Count updated:', newCount)
    set({ count: newCount })
  },
}))
```

### 2. Redux DevTools 사용
```typescript
import { devtools } from 'zustand/middleware'

export const useStore = create(
  devtools(
    (set) => ({
      // 스토어 로직
    }),
    { name: 'My Store' }
  )
)
```

## 성능 최적화

### 1. 선택적 구독
```typescript
// 전체 스토어를 구독하지 말고 필요한 부분만 구독
const count = useStore((state) => state.count)
const increment = useStore((state) => state.increment)
```

### 2. 메모이제이션
```typescript
import { useMemo } from 'react'

const expensiveValue = useMemo(() => {
  return useStore.getState().items.filter(item => item.active)
}, [])
```

## 예제 프로젝트 구조

```
src/
├── store/
│   ├── useCounterStore.ts
│   ├── useUserStore.ts
│   └── useCartStore.ts
├── components/
│   ├── Counter.tsx
│   ├── UserProfile.tsx
│   └── Cart.tsx
└── app/
    └── page.tsx
```

