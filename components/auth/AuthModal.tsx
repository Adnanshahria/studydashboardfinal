import React from 'react';
import { Modal } from '../ui/Modal';
import { AuthForm } from './AuthForm';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    modalMode: 'login' | 'create' | 'reset';
    setModalMode: (mode: 'login' | 'create' | 'reset') => void;
    tempUserId: string;
    setTempUserId: (val: string) => void;
    tempPassword: string;
    setTempPassword: (val: string) => void;
    confirmPassword: string;
    setConfirmPassword: (val: string) => void;
    showPassword: boolean;
    setShowPassword: (val: boolean) => void;
    handleUserAction: () => void;
    handleGuestLogin: () => void;
    isCheckingUser: boolean;
    modalError: string;
    modalSuccess: string;
    resetModalState: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = (props) => {
    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose} title={props.modalMode === 'login' ? 'Sign In' : props.modalMode === 'create' ? 'Create Account' : 'Reset Password'}>
            <div className="flex flex-col gap-6">
                <div className="flex p-1 bg-slate-200/50 dark:bg-black/40 rounded-full relative backdrop-blur-sm">
                    <button onClick={() => { props.setModalMode('login'); props.resetModalState(); }} className={`flex-1 py-2 text-xs font-bold rounded-full transition-all duration-300 z-10 ${props.modalMode === 'login' ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'}`}>Sign In</button>
                    <button onClick={() => { props.setModalMode('create'); props.resetModalState(); }} className={`flex-1 py-2 text-xs font-bold rounded-full transition-all duration-300 z-10 relative overflow-hidden ${props.modalMode === 'create' ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'}`}>
                        <span className="relative z-10">Create Account</span>
                        {props.modalMode !== 'create' && <span className="absolute inset-0 rounded-full bg-rose-500/20 animate-pulse shadow-[0_0_15px_rgba(244,63,94,0.6)] border border-rose-500/50"></span>}
                    </button>
                </div>
                <AuthForm 
                    modalMode={props.modalMode} setModalMode={(m) => { props.setModalMode(m); props.resetModalState(); }}
                    tempUserId={props.tempUserId} setTempUserId={props.setTempUserId}
                    tempPass={props.tempPassword} setTempPass={props.setTempPassword}
                    confirmPass={props.confirmPassword} setConfirmPass={props.setConfirmPassword}
                    showPass={props.showPassword} setShowPass={props.setShowPassword}
                    handleUserAction={props.handleUserAction} handleGuestLogin={props.handleGuestLogin}
                    isChecking={props.isCheckingUser} error={props.modalError} success={props.modalSuccess}
                />
                {props.modalError && (props.modalError.toLowerCase().includes('not found') || props.modalError.toLowerCase().includes('no user')) && (
                    <p className="text-[10px] text-center text-slate-500 animate-fade-in">
                        Database deleted? <button onClick={() => { props.setModalMode('create'); props.resetModalState(); }} className="text-blue-500 font-bold hover:underline">Create Account</button> again to restore.
                    </p>
                )}
            </div>
        </Modal>
    );
};