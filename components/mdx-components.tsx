import Image from "next/image";
import { useMDXComponent } from "next-contentlayer/hooks";

const components = {
  Image: (props: React.ComponentProps<typeof Image>) => (
    <Image {...props} alt={props.alt} />
  ),
};

interface MdxProps {
  code: string;
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);

  return <Component components={components} />;
}
