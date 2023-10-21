import Link from "next/link";
import Image from "next/image";
import classes from "@/styles/admin_nav.module.css";
import { useRouter } from "next/router";
import logo from "@/public/images/logo.png";
const AdminNav = () => {
  const router = useRouter();

  return (
    <div className={classes.nav}>
      <Link href="/admin" id={classes.logo}>
        <Image src={logo} width={100} height={100} priority alt="Logo" />
      </Link>
      <span
        id={classes.dashboard}
        className={router.asPath === "/admin" ? classes.active : ""}
      >
        <Link href="/admin">Dashboard</Link>
      </span>
      <span
        className={
          router.asPath === "/admin/view_product" ? classes.active : ""
        }
      >
        <Link href="/admin/view_product">Products</Link>
      </span>
      <span
        className={router.asPath === "/admin/view_sales" ? classes.active : ""}
      >
        <Link href="/admin/view_sales">Sales</Link>
      </span>
    </div>
  );
};

export default AdminNav;
