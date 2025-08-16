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
          className={`bg-white/50 w-full  dark:bg-gray-900 rounded-none ${
            index === 0
              ? 'rounded-t-lg'
              : index === questions.length - 1
              ? 'rounded-b-lg'
              : ''
          }`}
        >
          <AccordionTrigger
            className={`text-sm md:text-sm text-gray-700 data-[state=open]:text-gray-950 data-[state=open]:bg-gray-200 transition-all p-5 dark:text-white/85 dark:data-[state=open]:text-white dark:data-[state=open]:bg-gray-800 ${
              index === 0 ? 'rounded-t-lg' : 'rounded-none'
            }`}
          >
            {q.question}
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-sm p-4">
            {' '}
            <p>{q.answer}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default CustomAccordion;
