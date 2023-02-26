const Button = ({ title }: { title: string }) => {
  return <div style={ { width: 100, height: 50, backgroundColor: 'red' } }>
    <span>
      { title }
    </span>
  </div>
};

export {
  Button,
};
