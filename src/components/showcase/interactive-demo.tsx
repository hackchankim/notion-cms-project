"use client"

import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function InteractiveDemo() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Dialog 열기</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>확인이 필요합니다</DialogTitle>
              <DialogDescription>
                이 작업은 되돌릴 수 없습니다. 계속 진행하시겠습니까?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">취소</Button>
              </DialogClose>
              <Button onClick={() => toast.success("작업이 완료되었습니다.")}>확인</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Sheet 열기</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>사이드 패널</SheetTitle>
              <SheetDescription>
                Sheet는 모바일 친화적인 오버레이입니다. 설정, 상세 정보 등에 활용합니다.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">드롭다운</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>내 계정</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => toast.info("프로필 페이지로 이동")}>
              프로필
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => toast.info("설정 페이지로 이동")}>
              설정
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive"
              onClick={() => toast.error("로그아웃 되었습니다.")}
            >
              로그아웃
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="outline"
          onClick={() =>
            toast("이벤트 알림", {
              description: "sonner로 구현된 토스트입니다.",
              action: { label: "확인", onClick: () => {} },
            })
          }
        >
          Toast 트리거
        </Button>
      </div>

      <Tabs defaultValue="preview">
        <TabsList>
          <TabsTrigger value="preview">미리보기</TabsTrigger>
          <TabsTrigger value="code">코드</TabsTrigger>
          <TabsTrigger value="docs">문서</TabsTrigger>
        </TabsList>
        <TabsContent value="preview" className="rounded-md border p-4 text-sm text-muted-foreground">
          컴포넌트 미리보기 영역입니다.
        </TabsContent>
        <TabsContent value="code" className="rounded-md border p-4 text-sm text-muted-foreground">
          소스 코드 영역입니다.
        </TabsContent>
        <TabsContent value="docs" className="rounded-md border p-4 text-sm text-muted-foreground">
          문서 영역입니다.
        </TabsContent>
      </Tabs>
    </div>
  )
}
