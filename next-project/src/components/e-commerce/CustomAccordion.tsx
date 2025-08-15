import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Question } from './FrequentlyQuestions';

type Props = {
  questions: Question[];
};

function CustomAccordion({ questions }: Props) {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue="item-1"
    >
      {questions.map((q, index) => (
        <AccordionItem
          key={index}
          value={`item-${index + 1}`}
          className="bg-white/50 w-full rounded-lg dark:bg-gray-900"
        >
          <AccordionTrigger className="text-sm md:text-xl data-[state=open]:text-sky-700 data-[state=open]:bg-sky-100 transition-all p-5 dark:text-white/85 dark:data-[state=open]:text-white dark:data-[state=open]:bg-gray-800">
            {q.question}
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-sm md:text-lg p-4">
            {' '}
            <p>{q.answer}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default CustomAccordion;
