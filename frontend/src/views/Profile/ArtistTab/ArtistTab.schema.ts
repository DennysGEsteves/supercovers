import { yup } from 'utils';

const usernameRegExp = /^[a-z0-9-_]+$/i;

const checkIsEmptyString = (v: any, o: any) => (o === '' ? null : v);

export type FormSchema = {
  slug: string;
  about?: string;
  introVideo?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  website?: string;
  topImg?: string;
};

export const ArtistUpdateSchema: yup.SchemaOf<FormSchema> = yup.object({
  slug: yup
    .string()
    .matches(/^[a-z0-9-_]+$/, 'Slug inválido. Apenas letras, números, hífens e underlines são permitidos')
    .required(),
  about: yup.string().nullable(),
  introVideo: yup.string().matches(usernameRegExp, 'ID inválido').nullable().transform(checkIsEmptyString),
  facebook: yup.string().matches(usernameRegExp, 'Username inválido').nullable().transform(checkIsEmptyString),
  instagram: yup.string().matches(usernameRegExp, 'Username inválido').nullable().transform(checkIsEmptyString),
  twitter: yup.string().matches(usernameRegExp, 'Username inválido').nullable().transform(checkIsEmptyString),
  website: yup.string().url().nullable().transform(checkIsEmptyString),
  topImg: yup.string().optional(),
});
