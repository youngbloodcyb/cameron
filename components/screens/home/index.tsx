import { Footer } from "@/components/footer";
import * as FadeIn from "@/components/motion/staggers/fade";
import { Posts } from "@/components/posts";

import Link from "next/link";

const Spacer = () => <div style={{ marginTop: "24px" }} />;

export default function Home() {
  return (
    <FadeIn.Container>
      <FadeIn.Item>
        <div className="flex justify-between">
          <div>
            <h1>Cameron Youngblood</h1>

            <h2>
              aka{" "}
              <Link
                href="https://github.com/youngbloodcyb"
                target="_blank"
                className="underline"
              >
                @youngbloodcyb
              </Link>
            </h2>
          </div>
        </div>
      </FadeIn.Item>
      <Spacer />
      <FadeIn.Item>
        <p>Full-stack Software Engineer.</p>
        <p>
          Working at{" "}
          <Link href="https://ampry.com" className="underline" target="_blank">
            Ampry
          </Link>
          . Side projects at{" "}
          <Link href="https://9d8.dev" className="underline" target="_blank">
            9d8
          </Link>
          .
        </p>
        <p>
          <Link
            href="https://resume.cameron.so"
            className="underline"
            target="_blank"
          >
            Resume
          </Link>
        </p>
      </FadeIn.Item>
      <FadeIn.Item>
        <Posts category="projects" />
      </FadeIn.Item>
      {/* <FadeIn.Item>
        <Posts category="examples" />
      </FadeIn.Item> */}
      <Spacer />
      <FadeIn.Item>
        <Footer />
      </FadeIn.Item>
    </FadeIn.Container>
  );
}
