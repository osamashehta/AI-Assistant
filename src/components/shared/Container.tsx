const Container = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={`container max-w-[700px] w-full mx-auto px-4 md:px-0 ${className}`}>
            {children}
        </div>
    );
};
export default Container;