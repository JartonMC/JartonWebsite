"use client";

import { MenuIcon, X } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { usePathname } from "next/navigation";

import notificationStore from "@/store/notificationStore";

import navItems from "../navItems.json";

import styles from "../NavBar.module.css";

type Props = { clientIp?: string };

const Dynamic = ({ clientIp }: Props) => {
  const pathName = usePathname();

  const [hamMenuOpen, setHamMenuOpen] = useState(false);

  const notifications = notificationStore((state) => state.notifications);
  const popNotification = notificationStore((state) => state.popNotification);

  useEffect(() => {
    if (typeof window !== "undefined" && notifications.length > 0) {
      notifications.forEach((notification) => {
        toast[notification.type](notification.message, {
          position: window.innerWidth < 1024 ? "top-center" : "top-right",
          toastId: notification.id,
          autoClose: 5000,
          style: {
            backgroundColor: "var(--color4)",
            color: "var(--color5)",
            border: "2px solid var(--color2)",
          },
        });
      });

      popNotification();
    }
  }, [notifications, popNotification]);

  // Derive client IP from header (requires proxy to pass it through). Fallback hides panel.
  const [showPanel, setShowPanel] = useState(false);
  useEffect(() => {
    const allowed = [
      "199.126.160.104",
      "129.222.118.130",
      "96.32.211.210",
      "127.0.0.1",
      "::1",
      "localhost",
      
    ]; 
    if (clientIp && allowed.includes(clientIp)) setShowPanel(true);
  }, [clientIp]);

  return (
    <>
      <div className={styles.navBar_navItems}>
        {navItems.map((item, index) => (
          <Link
            href={item.href}
            target={item.target}
            style={{
              borderBottom:
                pathName === item.href ? "2px solid var(--color2)" : "none",
            }}
            key={index}
          >
            {item.name}
          </Link>
        ))}
        {showPanel && (
          <Link href="/panel" target="_self" style={{ borderBottom: "none" }}>
            Panel
          </Link>
        )}
      </div>
      {hamMenuOpen ? (
        <X
          onClick={() => setHamMenuOpen(false)}
          className={styles.navBar_hamIcon}
        />
      ) : (
        <MenuIcon
          onClick={() => setHamMenuOpen(true)}
          className={styles.navBar_hamIcon}
        />
      )}
      {hamMenuOpen && (
        <div className={styles.hamMenu}>
          {navItems.map((item, index) => (
            <Link
              href={item.href}
              target={item.target}
              style={{
                borderBottom:
                  pathName === item.href ? "2px solid var(--color2)" : "none",
              }}
              key={index}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default Dynamic;
