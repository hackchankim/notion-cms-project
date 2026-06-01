import { Container } from "@/components/layout/container"
import { ContactForm } from "@/components/showcase/contact-form"
import { InteractiveDemo } from "@/components/showcase/interactive-demo"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { SITE_CONFIG } from "@/lib/constants"
import { AlertCircle, Info, Terminal } from "lucide-react"

export default function Home() {
  return (
    <div className="py-12 space-y-20">
      {/* 히어로 섹션 */}
      <section className="text-center space-y-6">
        <Container>
          <div className="space-y-4">
            <Badge variant="secondary">Next.js 16 + React 19 + Tailwind v4</Badge>
            <h1 className="text-4xl font-bold tracking-tight lg:text-6xl">
              {SITE_CONFIG.name}
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              {SITE_CONFIG.description}
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <Button size="lg" asChild>
                <a href="#components">시작하기</a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href={SITE_CONFIG.url} target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <Separator />

      {/* Buttons */}
      <section id="components">
        <Container className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold">Button</h2>
            <p className="text-sm text-muted-foreground mt-1">6가지 variant, 4가지 size</p>
          </div>
          <div className="space-y-3">
            <div className="flex flex-wrap gap-3">
              <Button variant="default">Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button size="icon" aria-label="터미널 열기"><Terminal /></Button>
              <Button disabled>Disabled</Button>
            </div>
          </div>
        </Container>
      </section>

      <Separator />

      {/* Badge & Avatar */}
      <section>
        <Container className="space-y-6">
          <h2 className="text-2xl font-semibold">Badge & Avatar</h2>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
            </div>
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>HK</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>AB</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </Container>
      </section>

      <Separator />

      {/* Alert */}
      <section>
        <Container className="space-y-4">
          <h2 className="text-2xl font-semibold">Alert</h2>
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>안내</AlertTitle>
            <AlertDescription>
              이것은 기본 알림 메시지입니다. 사용자에게 정보를 전달할 때 사용합니다.
            </AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>오류 발생</AlertTitle>
            <AlertDescription>
              작업을 처리하는 중 문제가 발생했습니다. 다시 시도해주세요.
            </AlertDescription>
          </Alert>
        </Container>
      </section>

      <Separator />

      {/* Cards */}
      <section>
        <Container className="space-y-6">
          <h2 className="text-2xl font-semibold">Card</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>컴포넌트 라이브러리</CardTitle>
                <CardDescription>shadcn/ui + Radix UI</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  접근성을 고려한 헤드리스 UI 컴포넌트. Radix UI 프리미티브 기반으로
                  키보드 탐색과 스크린 리더를 완벽 지원합니다.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm">더 보기</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>다크 모드</CardTitle>
                <CardDescription>next-themes 연동</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  CSS 변수 기반의 테마 시스템. 헤더의 토글 버튼으로 라이트 / 다크 /
                  시스템 모드를 전환할 수 있습니다.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm">테마 전환</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>폼 & 유효성 검증</CardTitle>
                <CardDescription>react-hook-form + zod</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  업계 표준 라이브러리로 비제어 컴포넌트 방식의 고성능 폼을 구현합니다.
                  타입 안전한 zod 스키마로 유효성 검증을 처리합니다.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm">예시 보기</Button>
              </CardFooter>
            </Card>
          </div>
        </Container>
      </section>

      <Separator />

      {/* Skeleton & Progress */}
      <section>
        <Container className="space-y-6">
          <h2 className="text-2xl font-semibold">Skeleton & Progress</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-3">
              <p className="text-sm font-medium text-muted-foreground">로딩 스켈레톤</p>
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-4 w-28" />
                </div>
              </div>
              <Skeleton className="h-24 w-full" />
            </div>
            <div className="space-y-4">
              <p className="text-sm font-medium text-muted-foreground">진행률 표시 (예시)</p>
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>TypeScript</span><span>95%</span>
                  </div>
                  <Progress value={95} />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>React</span><span>88%</span>
                  </div>
                  <Progress value={88} />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Next.js</span><span>82%</span>
                  </div>
                  <Progress value={82} />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Separator />

      {/* Form 데모 */}
      <section>
        <Container className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold">Form</h2>
            <p className="text-sm text-muted-foreground mt-1">
              react-hook-form + zod 유효성 검증
            </p>
          </div>
          <div className="max-w-lg">
            <Card>
              <CardHeader>
                <CardTitle>문의하기</CardTitle>
                <CardDescription>
                  빈 채로 전송하면 zod 유효성 에러 메시지를 확인할 수 있습니다.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      <Separator />

      {/* Interactive */}
      <section>
        <Container className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold">Interactive Components</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Dialog, Sheet, Dropdown, Tabs, Toast
            </p>
          </div>
          <InteractiveDemo />
        </Container>
      </section>

      {/* 기술 스택 뱃지 */}
      <section className="bg-muted/30">
        <Container className="py-12 text-center space-y-4">
          <p className="text-sm font-medium text-muted-foreground">POWERED BY</p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              "Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4",
              "shadcn/ui", "lucide-react", "next-themes", "sonner",
              "react-hook-form", "zod", "usehooks-ts",
            ].map((tech) => (
              <Badge key={tech} variant="outline">{tech}</Badge>
            ))}
          </div>
        </Container>
      </section>
    </div>
  )
}
