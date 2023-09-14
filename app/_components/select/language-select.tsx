import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@ui/select';

import { getLanguages } from '@actions/getLanguages';

export async function LanguageSelect() {
  const { data: languages } = await getLanguages().catch(() => ({ data: [] }));

  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder='Choose language' />
      </SelectTrigger>
      <SelectContent className='max-h-[220px]'>
        <SelectGroup>
          {languages.map(({ iso_639_1, name, english_name }) => (
            <SelectItem key={iso_639_1} value={iso_639_1}>
              {name || english_name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
