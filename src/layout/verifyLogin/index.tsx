import { useEffect } from 'react';
import { useAppSelector } from '~/redux/hook';
import { useNavigate } from 'react-router-dom';
import {config} from '~/config';


export const VerifyLogin = () => {
    const userInfo = useAppSelector((state) => state.auth.userInfo);

    const navigate = useNavigate();

    useEffect(() => {
        if (userInfo && Object.getOwnPropertyNames(userInfo).length === 0) {
            navigate(config.routes.login);
        }
    }, [navigate, userInfo]);

    return null;
}

