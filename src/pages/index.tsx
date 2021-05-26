// eslint-disable-next-line import/no-extraneous-dependencies
import { useMemo } from 'react';
import { Button, Box } from '@chakra-ui/react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

interface ImagesData {
  data: [
    {
      title: string;
      description: string;
      url: string;
      ts: number;
      id: string;
    }
  ];
  after?: {
    id: string;
  };
}

export default function Home(): JSX.Element {
  async function fetchImages({ pageParam = null }): Promise<ImagesData> {
    const { data } = await api.get('/images', {
      params: {
        after: pageParam,
      },
    });

    return data;
  }

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery('images', fetchImages, {
    getNextPageParam: ({ after }) => after || null,
  });

  const formattedData = useMemo(() => {
    return data?.pages.map(page => page.data.map(item => item)).flat();
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />

        {hasNextPage && (
          <Button onClick={() => fetchNextPage()}>
            {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
          </Button>
        )}
      </Box>
    </>
  );
}
