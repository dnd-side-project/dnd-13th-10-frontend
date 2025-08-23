'use client';

import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Title } from '@/components/ui/Title';

import { useGeneralMemoirFormStore } from '../store/generalMemoirFormStore';

export default function ReferenceLink() {
  const data = useGeneralMemoirFormStore(state => state.formData.references);
  const updateFormData = useGeneralMemoirFormStore(
    state => state.updateFormData,
  );

  const handleFieldChange = (field: keyof typeof data, value: string) => {
    updateFormData('references', { ...data, [field]: value });
  };

  return (
    <section>
      <Title title="첨부 또는 링크" />
      <div className="flex flex-col gap-2">
        <Label label="URL" htmlFor="url" />
        <Input
          id="url"
          name="url"
          value={data.url}
          placeholder="http://"
          onChange={e => handleFieldChange('url', e.target.value)}
        />
      </div>
    </section>
  );
}
