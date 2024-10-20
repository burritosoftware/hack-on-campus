'use client'
import {RegisterLink, LoginLink, LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import {Button} from "@/components/ui/button";
import {Skeleton} from "@/components/ui/skeleton";
// @ts-ignore
import {usePathname} from "next/navigation";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {ChevronRightIcon, CircleUser, CircleX, Loader2} from "lucide-react";
import {useEffect, useState} from "react";

export function SignInButton() {
    const pathname = usePathname()

    return (
        <LoginLink postLoginRedirectURL={'/'}>
            <Button color={"primary"}>
                Sign In
            </Button>
        </LoginLink>)
}

export function SignOutButton() {
    return (<LogoutLink className={'w-full'}>
        <Button color={"danger"} className={'w-full'} >
            Logout
        </Button>
    </LogoutLink>)
}

export function Greeting() {
    const {
        isLoading,
        user,
        isAuthenticated
    } = useKindeBrowserClient();

    if (isLoading) {
        return (
            <Skeleton className="h-3 w-3/5 rounded-lg"/>
        )
    }

    if (!isAuthenticated) {
        return (
            <p className={'text-lg font-semibold'}>Hello, Guest</p>
        )
    }

    return (
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Hello, {user?.given_name}!</h1>
    )
}

export function UserBadge({ owner_id }: { owner_id: string }) {
    const {
        isLoading,
        user,
        isAuthenticated,
        getPermission
    } = useKindeBrowserClient();

    if (isLoading || !isAuthenticated) {
        return (
            <Skeleton className="h-3 w-3/5 rounded-lg"/>
        )
    }

    const isAdmin = getPermission('is:admin')
    let admin = user?.id === "kp_bf6160e9f89946659a327d751bb22137"

    console.log('Admin', admin)


    if (!admin) {
        return null
    }

    console.log(user?.id, owner_id)
    if (user?.id != owner_id) {
        // get the first five characters of the owner id and the last 2
        const owner_id_short = owner_id.slice(0, 5) + '...' + owner_id.slice(-2)

        return (
            <Button variant={"default"} onClick={() => {}}>
                <CircleUser className="h-4 w-4" /> {owner_id_short}
            </Button>
        )
    } else {
        return (
            <Button variant={"default"} onClick={() => {}}>
                <CircleUser className="h-4 w-4" /> You
            </Button>
        )
    }
}

export function Profile() {
    const {
        isLoading,
        user,
        isAuthenticated
    } = useKindeBrowserClient();


    if (isLoading) {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="overflow-hidden rounded-full"
                    >
                        <Avatar>
                            <Skeleton className={"flex rounded-full w-12 h-12"}/>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
            </DropdownMenu>
        )
    }

    if (!isAuthenticated) {
        return <SignInButton/>
    }

    return (
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
            >
                <Avatar>
                    {/* @ts-ignore */}
                    <AvatarImage src={user?.picture} alt={user?.email} />
                    <AvatarFallback>{String(user?.given_name).charAt(0)}{String(user?.family_name).charAt(0)}</AvatarFallback>
                </Avatar>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <LogoutLink>
                <DropdownMenuItem>
                    Logout
                </DropdownMenuItem>
            </LogoutLink>

        </DropdownMenuContent>
    </DropdownMenu>
    )
}

export function ProfilePic() {
    const {
        isLoading,
        user,
        isAuthenticated
    } = useKindeBrowserClient();

    if (isLoading) {
        return (
            <div>
                <Skeleton className="flex rounded-full w-12 h-12"/>
            </div>
        )
    }

    if (!isAuthenticated) {
        return null
    }

    // @ts-ignore
    return <Avatar src={user?.picture || `https://api.dicebear.com/7.x/rings/svg?seed=${user?.email}`} size="md" classNames={{
        base: "bg-transparent",
        img: "rounded-full bg-transparent"
    }}/>
}

export function CTALogin({ btnText = `Continue`, arrow = <ChevronRightIcon className="ml-2 h-4 w-4" />}) {

    const [pressed, setPressed] = useState(false)
    const [offline, setOffline] = useState(false)


    useEffect(() => {
        setOffline(!window.navigator.onLine)
        console.log(offline)
    }, []);


    if (offline) {
        return (
            <Button disabled variant={'ghost'}>
                <CircleX className="mr-2 h-4 w-4" />
                You are offline
            </Button>
        )

    }



    return (
        <LoginLink postLoginRedirectURL={'/manage'}  authUrlParams={{
            connection_id: "conn_018f08764fadbe40f7bd58abc7492a78"
        }} >

            {pressed && (
                <Button disabled variant={'ghost'}>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                </Button>
            )}

            {!pressed && (
                <Button
                    variant={"ghost"}
                    onClick={() => setPressed(true)}
                >
                    {btnText}
                    {arrow}

                </Button>)
            }


        </LoginLink>
    )
}
