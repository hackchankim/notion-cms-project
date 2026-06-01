# Hooks

이 디렉토리는 **앱 전용** 커스텀 훅을 위한 공간입니다.

## 범용 훅: usehooks-ts 사용

일반적인 브라우저 API 훅은 직접 작성하지 않고 [`usehooks-ts`](https://usehooks-ts.com)를 사용합니다.

```ts
import {
  useLocalStorage,    // localStorage 읽기/쓰기
  useDebounce,        // 값 디바운스
  useMediaQuery,      // 미디어 쿼리 감지
  useWindowSize,      // 창 크기
  useOnClickOutside,  // 외부 클릭 감지
  useToggle,          // boolean 토글
  useCopyToClipboard, // 클립보드 복사
  useCountdown,       // 카운트다운 타이머
  useInterval,        // setInterval 훅
  useTimeout,         // setTimeout 훅
} from "usehooks-ts"
```

## 앱 전용 훅 작성 기준

이 디렉토리에는 다음 경우에만 새 훅을 추가합니다:
- `usehooks-ts`에 없는 앱 도메인 특화 로직
- API 호출을 포함하는 데이터 페칭 훅
- 여러 컴포넌트에서 공유하는 비즈니스 로직
