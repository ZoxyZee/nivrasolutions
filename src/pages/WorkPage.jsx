import PageIntro from "../components/PageIntro";
import PageCta from "../components/PageCta";
import Work from "../sections/Work";

export default function WorkPage() {
  return (
    <>
      <PageIntro
        eyebrow="Selected work / 02"
        number="02"
        title="Software projects"
        accent="with practical purpose."
        description="Deployed operational systems and products we have built, presented with clear delivery status."
      />
      <Work />
      <PageCta label="Your project could be next." />
    </>
  );
}
