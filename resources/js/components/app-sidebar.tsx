import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from '@/components/ui/sidebar';

import { Link, usePage } from "@inertiajs/react";
import { ChevronDown, LayoutGrid, Users, MessageSquare, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import AppLogo from './app-logo';
import { NavUser } from './nav-user';

export function AppSidebar() {
    const { url } = usePage();
    const [openContact, setOpenContact] = useState(false);

    useEffect(() => {
        if (url.startsWith('/contact')) {
            setOpenContact(true);
        }
    }, [url]);


    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard">
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarMenu>
                    {/* Regular Item */}
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={url.startsWith('/dashboard')}>
                            <Link href="/dashboard">
                                <LayoutGrid className="mr-2 h-4 w-4" />
                                Dashboard
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    {/* Regular Item for Students */}
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={url.startsWith('/students')}>
                            <Link href="/students">
                                <Users className="mr-2 h-4 w-4" />
                                Students
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                        <SidebarMenuButton onClick={() => setOpenContact(!openContact)} isActive={url.startsWith('/contact')}>
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Contact
                            <ChevronDown
                                className={`ml-auto h-4 w-4 transition-transform ${openContact ? "rotate-180" : ""
                                    }`}
                            />
                        </SidebarMenuButton>

                        {openContact && (
                            <SidebarMenuSub>
                                <SidebarMenuSubItem>
                                    <SidebarMenuSubButton asChild isActive={url === '/contact/public-message'}>
                                        <Link href="/contact/public-message">Public Message</Link>
                                    </SidebarMenuSubButton>
                                </SidebarMenuSubItem>

                                <SidebarMenuSubItem>
                                    <SidebarMenuSubButton asChild isActive={url === '/contact/contact-us'}>
                                        <Link href="/contact/contact-us">Contact Us</Link>
                                    </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                            </SidebarMenuSub>
                        )}
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <a href={window.location.origin} target="_blank">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                Visit Site
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
