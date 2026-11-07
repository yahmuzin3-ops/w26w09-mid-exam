import { Outlet } from "react-router"
import { useAuthStore } from "~/lib/auth-store"
import { supabase } from '../lib/supabase'
import type { Route } from "./+types/header";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "기말고사" },
    { name: "description", content: "제 성적 소생할수있습니까" },
  ]
}

export async function clientLoader() {
  const store = useAuthStore.getState()                                 

  if (store.status === "authenticated") return
  const { data: { session } } = await supabase.auth.getSession()

  if (session) {
    store.setSession(session)
  } else {
    // 세션이 없다면 하드코딩된 계정으로 로그인
    try {
      await store.signIn("gdhong@test.com", "pass123")
    } catch (error) {
      console.error("로그인 실패:", error)
    }
  }
}

export default function Header() {
  const user = useAuthStore((s) => s.user)

  return (
    <div>
      <header className="header bg-violet-900 text-white p-4">
        <h1>성적을 소생하는방법 {user?.email}</h1>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  )
}