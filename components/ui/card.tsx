export function Card({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div {...props}>{children}</div>;
  }
  
  export function CardHeader({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <header {...props}>{children}</header>;
  }
  
  export function CardContent({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div {...props}>{children}</div>;
  }
  
  export function CardDescription({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <p {...props}>{children}</p>;
  }
  
  export function CardTitle({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
    return <h2 {...props}>{children}</h2>;
  }
  export function CardFooter({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div {...props}>{children}</div>;
  }
  