import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({isAuthenticated, user, children}) {
    
    const routeLocation = useLocation(); 

    if(!isAuthenticated 
        && !(
            routeLocation.pathname.includes('/login') 
            || routeLocation.pathname.includes('/register') 
        ) 
        ) {
        return <Navigate to='/auth/login' />
    } 

    if(isAuthenticated 
        && (
            (routeLocation.pathname.includes('/login') || 
             routeLocation.pathname.includes("/register") )
        )
     ) {
        if(user?.role === 'admin') {
            return <Navigate to="/admin/dashboard" />
        } else {
            return <Navigate to="/shop/home" />
        }
    }

    if(isAuthenticated 
        && user?.role !== 'admin' 
        && routeLocation.pathname.includes('admin') 
    ) {
        return <Navigate to="/unauth-login" />
    }   

    if(isAuthenticated 
        && user?.role == 'admin' 
        && routeLocation.pathname.includes('shop') 
    ) {
        return <Navigate to="/admin/dashboard" />
    }

    return ( 
        <>
            {children}
        </> 
    );
}

export default CheckAuth;