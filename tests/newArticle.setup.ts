import { expect, test as setup } from '@playwright/test';

setup('create new article', async ({ request }) => {
  const articleResponse = await request.post(
    'https://conduit-api.bondaracademy.com/api/articles/',
    {
      data: {
        article: {
          tagList: [''],
          title: 'Like test article',
          description: 'Test Article Description',
          body: 'Test Article Body',
        },
      },
    },
  );
  expect(articleResponse.status()).toEqual(201);
  const response = await articleResponse.json();
  const slugId = response.article.slug;
  console.log(slugId);
  process.env['SLUGID'] = slugId;
});
