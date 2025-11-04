import React, { useState, useEffect, useRef } from 'react';
import type { Product, Review, SimpleProduct, Breadcrumb, StoreInfo, DescriptionSection } from './types';

// --- MOCK DATA ---
const productData: Product = {
  id: '123',
  name: 'Paco Rabanne 1 Million EDT 100ml para Masculino',
  breadcrumbs: [
      { name: 'Beleza e Cuidado Pessoal', link: '#' },
      { name: 'Perfumes e Fragrâncias', link: '#' },
      { name: 'Perfumes' }
  ],
  images: [
    'https://cdn.awsli.com.br/150/150124/produto/36278628/9bc8c9016f.jpg',
    'https://img.lojasrenner.com.br/item/515784414/original/2.jpg',
    'https://medias.rabanne.com/cdn-cgi/image/width=700,quality=90/https://medias.rabanne.com/medias/sys_master/images/ha6/h84/10571549933598/10571549868062/10571549868062.jpg',
    'https://images.tcdn.com.br/img/img_prod/1325300/perfume_one_million_masc_paco_rabanne_eau_de_toilette_unika_cosmeticos_1567_2_3b47fa176de3cca350f753c8e7c6c631.jpg'
  ],
  status: 'Novo',
  sold: 4832,
  rating: 4.8,
  reviewCount: 987,
  originalPrice: 409.00,
  currentPrice: 39.90,
  dealOfTheDay: true,
  installments: { count: 12, value: 3.88 },
  shipping: { free: true, eta: 'amanhã' },
  stock: 132,
  sellerProducts: [
    { id: 's1', name: 'Perfume Invictus Victory Paco Rabanne Eau de Parfum 100ml', image: 'https://cdn.sistemawbuy.com.br/arquivos/feb5eb39b3a2004abcc3bcd79041ba64/produtos/648bb1143b9e2/invictus-victory-67f6d3a5ba729.jpg', currentPrice: 449.90 },
    { id: 's2', name: 'Phantom Paco Rabanne Eau de Toilette 100ml', image: 'https://www.giraofertas.com.br/wp-content/uploads/2021/09/Phantom-Paco-Rabanne-Eau-de-Toilette-05.jpg', currentPrice: 429.00 }
  ],
  highlights: [
    'Fragrância: amadeirado quente.',
    'País de origem: Espanha.'
  ],
  characteristics: [
    {
        category: 'Características gerais',
        specs: [
            { label: 'Marca', value: 'Paco Rabanne' },
            { label: 'Linha', value: 'One million' },
            { label: 'Nome do perfume', value: '1 Million' },
            { label: 'Versão', value: 'Tradicional' },
            { label: 'Gênero', value: 'Masculino' },
            { label: 'Tipo de perfume', value: 'Eau de toilette' },
            { label: 'É recarregável', value: 'Não' },
        ],
    },
    {
        category: 'Formato de venda',
        specs: [
            { label: 'Volume da unidade', value: '100 mL' },
            { label: 'É set', value: 'Não' },
            { label: 'Inclui estojo', value: 'Não' },
        ],
    },
  ],
  storeInfo: {
    name: 'Mercado Livre',
    officialStore: 'Loja oficial no Mercado Livre',
    logo: 'https://http2.mlstatic.com/frontend-assets/ml-web-navigation/ui-navigation/5.21.2/mercadolibre/logo__large_plus.png',
    level: 'MercadoLíder Platinum',
    levelDescription: 'É um dos melhores do site!',
    reputationColors: ['bg-red-200', 'bg-orange-200', 'bg-yellow-200', 'bg-lime-200', 'bg-green-500'],
    metrics: [
        { icon: 'sales', value: '+1M', description: 'Vendas nos últimos 365 dias' },
        { icon: 'service', description: 'Presta bom atendimento' },
        { icon: 'delivery', description: 'Entrega os produtos dentro do prazo' }
    ]
  },
  description: [
    {
        title: '',
        content: 'O perfume Paco Rabanne 1 Million EDT é uma fragrância icônica que personifica o luxo, a masculinidade e a ousadia. Lançado pela renomada casa de moda Paco Rabanne, essa criação aromática tem conquistado corações desde o seu lançamento. Projetado para o homem moderno e autoconfiante, o 1 Million encapsula uma personalidade distinta em cada borrifada.'
    },
    {
        title: 'Notas Olfativas:',
        content: [
            'Notas de Saída (Topo): Pomelo, Menta Picante, Tangerina',
            'Notas de Coração (Meio): Rosa, Canela, Condimentos',
            'Notas de Base (Fundo): Couro Aveludado, Madeira Branca, Âmbar'
        ]
    },
    {
        title: 'Descrição:',
        content: 'O Paco Rabanne 1 Million EDT se destaca pela sua abertura fresca e efervescente, com notas cítricas de pomelo e tangerina combinadas com a revigorante menta picante. Essa fusão inicial evoca uma sensação de energia e vitalidade.'
    },
    {
        title: '',
        content: 'À medida que a fragrância se desenvolve, o coração revela um intrigante contraste entre a doçura da rosa e o calor da canela e dos condimentos. Essa combinação cria uma dimensão mais profunda, adicionando uma dose de sensualidade à fragrância.'
    },
    {
        title: '',
        content: 'A base do perfume é rica e envolvente. O couro aveludado e a madeira branca criam uma base quente e sofisticada, enquanto o âmbar contribui para a longevidade da fragrância, garantindo que ela permaneça presente na pele ao longo do dia.'
    },
    {
        title: 'O Frasco:',
        content: 'O frasco do Paco Rabanne 1 Million EDT é uma verdadeira obra de arte. Inspirado em uma barra de ouro, ele captura a estética luxuosa e extravagante do perfume. O tom dourado intenso e o design facetado conferem um toque visualmente impactante, refletindo a opulência que a fragrância representa.'
    },
    {
        title: 'O Conceito:',
        content: 'O nome "1 Million" reflete a ideia de ser único, exclusivo e valioso, como uma peça rara. A fragrância personifica essa ideia, oferecendo uma experiência sensorial única e inesquecível que complementa a personalidade do homem que a usa.'
    },
    {
        title: 'Ocasiões e Estações:',
        content: 'O Paco Rabanne 1 Million EDT é uma escolha versátil, perfeita para uma variedade de ocasiões, desde eventos formais até encontros casuais. Sua combinação de frescor, calor e sensualidade o torna adequado para todas as estações do ano.'
    },
    {
        title: 'Conclusão:',
        content: 'O Paco Rabanne 1 Million EDT é muito mais do que uma fragrância; é uma afirmação de estilo, confiança e autenticidade. A fusão de notas vibrantes e profundas cria uma experiência olfativa que não apenas evoca emoções, mas também deixa uma impressão duradoura por onde você passa. Se você busca uma fragrância que celebra a individualidade e a sofisticação, o Paco Rabanne 1 Million EDT é uma escolha verdadeiramente excepcional.'
    }
  ],
  reviews: [
    { id: 1, author: 'Carlos S.', rating: 5, date: '2025-10-25', title: 'Fragrância incrível!', comment: 'A fragrância é incrível, marcante e dura o dia todo. Perfeito para ocasiões especiais. A embalagem é um luxo. Recomendo!', helpfulVotes: 25, images: ['https://m.media-amazon.com/images/I/61c13wJSoTL.jpg'] },
    { id: 2, author: 'Maria L.', rating: 5, date: '2025-10-15', title: 'Excelente!', comment: 'Fragrância excelente! Chegou muito rápido e bem embalado. Comprarei novamente com certeza.', helpfulVotes: 18, images: ['https://m.media-amazon.com/images/I/61Pjnf8Qo+L.jpg'] },
    { id: 3, author: 'José A.', rating: 4, date: '2025-11-02', title: 'Ótimo custo-benefício', comment: 'Um perfume muito bom para o dia a dia. Não é o mais intenso, mas pelo preço, vale muito a pena. A fixação é boa.', helpfulVotes: 9, images: ['https://m.media-amazon.com/images/I/61g96k6g4eL.jpg'] }
  ],
  relatedProducts: [
    { id: 'r1', name: 'Sauvage Dior Eau de Parfum 100ml', image: 'https://img.lojasrenner.com.br/item/550288862/original/5.jpg', originalPrice: 699.00, currentPrice: 599.90, installments: { count: 12, value: 50.00 }, coupon: '10% OFF', freeShipping: true },
    { id: 'r2', name: '212 VIP Black Carolina Herrera Eau de Parfum 100ml', image: 'https://m.media-amazon.com/images/I/614VHjBiQSL._AC_UF1000,1000_QL80_.jpg', originalPrice: 549.00, currentPrice: 479.90, installments: { count: 12, value: 40.00 }, coupon: '10% OFF', freeShipping: true },
    { id: 'r3', name: 'Bleu de Chanel Eau de Parfum 100ml', image: 'https://www.chanel.com/puls-img/1750768790390-onepdpeditopushdm974x1298px052xjpg_2596x1948.jpg', originalPrice: 899.00, currentPrice: 799.90, installments: { count: 12, value: 66.66 }, freeShipping: true }
  ]
};

// --- ICONS ---
// FIX: Update Icon component to accept a `strokeWidth` prop.
const Icon: React.FC<{ children: React.ReactNode; className?: string; strokeWidth?: number }> = ({ children, className, strokeWidth = 2 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={strokeWidth}>
    {children}
  </svg>
);

const ArrowLeftIcon = () => <Icon className="h-6 w-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></Icon>;
const SearchIcon = () => <Icon className="h-6 w-6"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></Icon>;
const MenuIcon = () => <Icon className="h-6 w-6"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></Icon>;
const HeartIcon = () => <Icon className="h-6 w-6 text-blue-500"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></Icon>;
const StarIcon: React.FC<{ filled?: boolean; className?: string }> = ({ filled = true, className = 'w-5 h-5' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`${className} ${filled ? 'text-blue-500' : 'text-gray-300'}`} viewBox="0 0 20 20" fill="currentColor">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);
const TruckIcon = () => <Icon className="h-6 w-6 text-green-600"><path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h8l2-2zM5 11h6" /></Icon>;
const ThumbsUpIcon = () => <Icon className="w-4 h-4 text-gray-500"><path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.085a2 2 0 00-1.736.93L5 10m7 0a2 2 0 002 2h2.764a2 2 0 011.789 2.894l-3.5 7a2 2 0 01-1.789.894h-4.017c-.163 0-.326-.02-.485-.06L7 20" /></Icon>;
const MoreHorizontalIcon = () => <Icon className="w-5 h-5 text-gray-400"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" /></Icon>;
const RibbonIcon = () => <Icon className="h-6 w-6 text-green-600"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></Icon>;
const SalesTagIcon = () => <Icon className="w-8 h-8 text-gray-700" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></Icon>;
const ChatCheckIcon = () => <Icon className="w-8 h-8 text-gray-700" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /><path strokeLinecap="round" strokeLinejoin="round" d="M9 10l2 2 4-4" /></Icon>;
const ClockCheckIcon = () => <Icon className="w-8 h-8 text-gray-700" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75" /></Icon>;

// --- REUSABLE COMPONENTS ---

const StarRating: React.FC<{ rating: number; reviewCount: number; showCount?: boolean }> = ({ rating, reviewCount, showCount = true }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center space-x-1">
      {[...Array(fullStars)].map((_, i) => <StarIcon key={`full-${i}`} />)}
      {halfStar && <StarIcon />}
      {[...Array(emptyStars)].map((_, i) => <StarIcon key={`empty-${i}`} filled={false} />)}
      {showCount && <span className="text-sm text-gray-500 ml-2">({reviewCount})</span>}
    </div>
  );
};

const Header: React.FC = () => (
  <header className="bg-yellow-400 p-2 shadow-md sticky top-0 z-20">
    <div className="max-w-6xl mx-auto flex items-center justify-between">
      <button className="text-gray-800"><ArrowLeftIcon /></button>
      <div className="flex-1 mx-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar produtos, marcas e muito mais..."
            className="w-full py-2 px-4 rounded-full text-sm focus:outline-none"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            <SearchIcon />
          </span>
        </div>
      </div>
      <button className="text-gray-800"><MenuIcon /></button>
    </div>
  </header>
);

const Breadcrumbs: React.FC<{ crumbs: Breadcrumb[] }> = ({ crumbs }) => (
    <nav className="text-xs text-gray-500 mb-4">
        <ol className="list-none p-0 inline-flex flex-wrap">
            {crumbs.map((crumb, index) => (
                <li key={index} className="flex items-center">
                    {crumb.link ? (
                        <a href={crumb.link} className="text-blue-600 hover:underline">{crumb.name}</a>
                    ) : (
                        <span className="text-gray-500">{crumb.name}</span>
                    )}
                    {index < crumbs.length - 1 && <span className="mx-2">&gt;</span>}
                </li>
            ))}
        </ol>
    </nav>
);


const ProductGallery: React.FC<{ images: string[]; }> = ({ images }) => {
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex md:flex-col gap-2 order-2 md:order-1">
        {images.map((img, index) => (
          <button
            key={index}
            onMouseEnter={() => setActiveImage(img)}
            className={`w-12 h-12 border rounded-md overflow-hidden ${activeImage === img ? 'border-blue-500' : 'border-gray-300'}`}
          >
            <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-contain" />
          </button>
        ))}
      </div>
      <div className="relative flex-1 order-1 md:order-2">
        <img src={activeImage} alt="Product image" className="w-full h-auto object-contain rounded-lg max-h-[400px]" />
      </div>
    </div>
  );
};

const ProductInfo: React.FC<{ product: Product; buyButtonRef: React.Ref<HTMLDivElement> }> = ({ product, buyButtonRef }) => {
  const discount = Math.round(((product.originalPrice - product.currentPrice) / product.originalPrice) * 100);

  return (
    <div className="border border-gray-200 rounded-lg p-6 flex flex-col">
      <div className="text-xs text-gray-500 mb-2">
        <span>{product.status}</span>
        <span className="mx-2">|</span>
        <span>+ {product.sold} vendidos</span>
        <button className="float-right"><HeartIcon /></button>
      </div>
      <h1 className="text-xl font-semibold mb-2">{product.name}</h1>
      <div className="mb-4">
        <StarRating rating={product.rating} reviewCount={product.reviewCount} />
      </div>
      <div className="mb-4">
        <span className="text-sm text-gray-500 line-through">
          R$ {product.originalPrice.toFixed(2).replace('.', ',')}
        </span>
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-light">R$ {product.currentPrice.toFixed(2).replace('.', ',')}</span>
          <span className="text-lg text-green-600">{discount}% OFF</span>
        </div>
        {product.dealOfTheDay && (
          <div className="mt-2">
            <span className="bg-blue-500 text-white text-sm font-semibold px-3 py-1 rounded">
              OFERTA DO DIA
            </span>
          </div>
        )}
        <div className="text-sm mt-2">
          em <span className="text-green-600">12x R$ {product.installments.value.toFixed(2).replace('.', ',')}</span>
        </div>
        <a href="#" className="text-sm text-blue-500 hover:underline mt-1 block">
          Ver os meios de pagamento
        </a>
      </div>
      <div className="flex items-start space-x-3 mb-6">
        <TruckIcon />
        <div>
          <p className="text-green-600 font-semibold">Receba grátis {product.shipping.eta}</p>
          <a href="#" className="text-sm text-blue-500 hover:underline">Ver mais detalhes e formas de entrega</a>
        </div>
      </div>
      <div className="mb-4">
        <p className="text-sm font-semibold">Quantidade</p>
        <div className="flex items-center text-sm mt-1">
          <span className="text-gray-800">1 unidade</span>
        </div>
      </div>
      <div ref={buyButtonRef} className="space-y-2 mt-auto">
        <a 
          href="https://yZRr.checkout.lunacheckout.com/checkout?product=07b4c2fa-b91b-11f0-a710-46da4690ad53" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full bg-blue-500 text-white font-semibold py-3 rounded-md hover:bg-blue-600 transition-colors text-center block"
        >
          Comprar agora
        </a>
      </div>
    </div>
  );
};

const SellerProducts: React.FC<{ products: SimpleProduct[] }> = ({ products }) => (
  <div className="bg-white p-6 my-4 rounded-lg shadow-sm">
    <h2 className="text-xl font-semibold mb-4">Produtos do vendedor</h2>
    <div className="flex flex-col sm:flex-row items-start gap-4">
      {products.map(p => (
        <div key={p.id} className="flex items-center gap-4">
          <img src={p.image} alt={p.name} className="w-16 h-16 object-contain border rounded-md" />
          <div>
            <p className="text-sm">{p.name}</p>
            <p className="text-lg font-semibold">R$ {p.currentPrice.toFixed(2).replace('.', ',')}</p>
          </div>
        </div>
      ))}
      <a href="#" className="text-blue-500 text-sm mt-2 sm:mt-0 sm:ml-auto self-center">&gt; Ver mais produtos do vendedor</a>
    </div>
  </div>
);

const ProductKnowledge: React.FC<{ highlights: string[] }> = ({ highlights }) => (
  <div className="bg-white p-6 my-4 rounded-lg shadow-sm">
    <h2 className="text-xl font-semibold mb-4">O que você precisa saber sobre este produto</h2>
    <ul className="list-disc list-inside space-y-2 text-gray-700">
      {highlights.map((h, i) => <li key={i}>{h}</li>)}
    </ul>
  </div>
);

const ProductCharacteristics: React.FC<{ characteristics: Product['characteristics'] }> = ({ characteristics }) => (
    <div className="bg-white p-6 my-4 rounded-lg shadow-sm">
      <h2 className="text-2xl font-light mb-4 pb-4 border-b">Características do produto</h2>
      {characteristics.map((group, groupIndex) => (
        <div key={groupIndex} className="mb-6 last:mb-0">
          <h3 className="text-lg font-semibold mb-4">{group.category}</h3>
          <div>
            {group.specs.map((spec, specIndex) => (
              <div key={specIndex} className={`flex items-center py-3 px-4 ${specIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                <p className="w-1/2 text-sm text-gray-800 font-semibold">{spec.label}</p>
                <p className="w-1/2 text-sm text-gray-600">{spec.value}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
);

const StoreInfoSection: React.FC<{ storeInfo: StoreInfo }> = ({ storeInfo }) => {
    const MetricIcon = ({ type }: { type: 'sales' | 'service' | 'delivery' }) => {
        switch (type) {
            case 'sales': return <SalesTagIcon />;
            case 'service': return <ChatCheckIcon />;
            case 'delivery': return <ClockCheckIcon />;
            default: return null;
        }
    };

    return (
        <div className="bg-white p-6 my-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-6">Informações da loja</h2>
            <div className="flex items-center gap-4 mb-6">
                <img src={storeInfo.logo} alt={`${storeInfo.name} logo`} className="w-12 h-12 object-contain rounded-full border p-1" />
                <div>
                    <p className="font-semibold text-gray-800">{storeInfo.name}</p>
                    <p className="text-sm text-gray-500">{storeInfo.officialStore}</p>
                </div>
            </div>
            <div className="flex items-center gap-2 mb-6">
                <RibbonIcon />
                <div>
                    <p className="font-semibold text-green-600">{storeInfo.level}</p>
                    <p className="text-sm text-gray-500">{storeInfo.levelDescription}</p>
                </div>
            </div>
            <div className="flex w-full h-2 rounded-md overflow-hidden mb-6">
                {storeInfo.reputationColors.map((color, index) => (
                    <div key={index} className={`flex-1 ${color}`}></div>
                ))}
            </div>
            <div className="grid grid-cols-3 divide-x text-center mb-6">
                {storeInfo.metrics.map((metric, index) => (
                    <div key={index} className="px-2">
                        <div className="flex justify-center items-center h-10">
                           {metric.value ? (
                               <p className="text-2xl font-semibold text-gray-800">{metric.value}</p>
                           ) : (
                               <MetricIcon type={metric.icon} />
                           )}
                        </div>
                        <p className="text-xs text-gray-600 mt-1">{metric.description}</p>
                    </div>
                ))}
            </div>
            <a href="#" className="flex justify-between items-center text-blue-500 hover:text-blue-600 text-sm">
                <span>Ver mais dados de {storeInfo.name}</span>
                <span>&gt;</span>
            </a>
        </div>
    );
};

const ProductDescription: React.FC<{ description: DescriptionSection[] }> = ({ description }) => (
    <div className="bg-white p-6 my-4 rounded-lg shadow-sm">
        <h2 className="text-2xl font-light mb-4 pb-4 border-b">Descrição</h2>
        <div className="space-y-4 text-gray-700 text-sm">
            {description.map((section, index) => (
                <div key={index}>
                    {section.title && <p className="font-semibold mb-2">{section.title}</p>}
                    {Array.isArray(section.content) ? (
                        <div className="space-y-1">
                            {section.content.map((line, lineIndex) => (
                                <p key={lineIndex}>{line}</p>
                            ))}
                        </div>
                    ) : (
                        <p>{section.content}</p>
                    )}
                </div>
            ))}
        </div>
    </div>
);

const ReviewItem: React.FC<{ review: Review }> = ({ review }) => (
  <div className="py-4 border-b last:border-b-0">
    <div className="flex justify-between items-center mb-2">
      <StarRating rating={review.rating} reviewCount={0} showCount={false} />
      <span className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric'})}</span>
    </div>
    <h3 className="font-semibold">{review.title}</h3>
    <p className="text-gray-600 text-sm mt-1">{review.comment}</p>
    {review.images && review.images.length > 0 && (
        <div className="flex gap-2 mt-3">
            {review.images.map((img, index) => (
                <img key={index} src={img} alt={`Review image ${index + 1}`} className="w-20 h-20 object-cover rounded-md border cursor-pointer hover:opacity-80 transition-opacity" />
            ))}
        </div>
    )}
    <div className="flex items-center mt-3 text-sm">
      <button className="flex items-center space-x-2 border rounded-full px-3 py-1 hover:bg-gray-100">
        <ThumbsUpIcon />
        <span>É útil</span>
      </button>
      <span className="ml-3 text-gray-500">{review.helpfulVotes}</span>
      <button className="ml-auto text-gray-400"><MoreHorizontalIcon /></button>
    </div>
  </div>
);

const Reviews: React.FC<{ product: Product }> = ({ product }) => (
  <div className="bg-white p-6 my-4 rounded-lg shadow-sm">
    <h2 className="text-xl font-semibold mb-4">Opiniões sobre o produto</h2>
    <div className="flex items-start gap-4 mb-6">
      <div className="text-center">
        <p className="text-5xl font-light">{product.rating.toFixed(1)}</p>
        <StarRating rating={product.rating} reviewCount={0} showCount={false} />
        <p className="text-xs text-gray-500 mt-1">Média entre {product.reviewCount} opiniões</p>
      </div>
      <div className="flex-1">
        {/* Placeholder for rating bars */}
        <div className="space-y-1 text-sm text-gray-600">
          <div className="flex items-center gap-2"><span>5 estrelas</span> <div className="w-full bg-gray-200 rounded-full h-1.5"><div className="bg-blue-500 h-1.5 rounded-full" style={{width: '85%'}}></div></div></div>
          <div className="flex items-center gap-2"><span>4 estrelas</span> <div className="w-full bg-gray-200 rounded-full h-1.5"><div className="bg-blue-500 h-1.5 rounded-full" style={{width: '10%'}}></div></div></div>
          <div className="flex items-center gap-2"><span>3 estrelas</span> <div className="w-full bg-gray-200 rounded-full h-1.5"><div className="bg-blue-500 h-1.5 rounded-full" style={{width: '3%'}}></div></div></div>
          <div className="flex items-center gap-2"><span>2 estrelas</span> <div className="w-full bg-gray-200 rounded-full h-1.5"><div className="bg-blue-500 h-1.5 rounded-full" style={{width: '1%'}}></div></div></div>
          <div className="flex items-center gap-2"><span>1 estrela</span> <div className="w-full bg-gray-200 rounded-full h-1.5"><div className="bg-blue-500 h-1.5 rounded-full" style={{width: '1%'}}></div></div></div>
        </div>
      </div>
    </div>
    
    <div>
      {product.reviews.map(review => <ReviewItem key={review.id} review={review} />)}
    </div>
    <button className="text-blue-500 text-sm mt-4">Ver todas as opiniões</button>
  </div>
);

const RelatedProductCard: React.FC<{ product: SimpleProduct }> = ({ product }) => (
    <div className="border rounded-lg overflow-hidden flex flex-col h-full">
        <img src={product.image} alt={product.name} className="w-full h-40 object-contain p-2"/>
        <div className="p-4 border-t flex-grow flex flex-col">
            <p className="text-sm text-gray-700 flex-grow">{product.name}</p>
            <div className="mt-2">
                {product.originalPrice && <p className="text-xs text-gray-500 line-through">R$ {product.originalPrice.toFixed(2).replace('.', ',')}</p>}
                <div className="flex items-baseline gap-2">
                    <p className="text-lg font-semibold">R$ {product.currentPrice.toFixed(2).replace('.', ',')}</p>
                    {product.originalPrice && <span className="text-sm text-green-600">{Math.round(((product.originalPrice - product.currentPrice)/product.originalPrice)*100)}% OFF</span>}
                </div>
                {product.installments && <p className="text-xs text-green-600">12x R$ {product.installments.value.toFixed(2).replace('.', ',')}</p>}
                {product.coupon && <p className="text-xs text-blue-500 mt-1">Cupom {product.coupon}</p>}
                {product.freeShipping && <p className="text-xs text-green-600 font-semibold mt-1">Frete grátis</p>}
            </div>
        </div>
    </div>
);

const RelatedProducts: React.FC<{ products: SimpleProduct[] }> = ({ products }) => (
  <div className="bg-white p-6 my-4 rounded-lg shadow-sm">
    <h2 className="text-xl font-semibold mb-4">Quem comprou este produto, também comprou</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map(p => <RelatedProductCard key={p.id} product={p} />)}
    </div>
  </div>
);

const StickyBuyBar: React.FC<{ product: Product; isVisible: boolean }> = ({ product, isVisible }) => (
    <div className={`fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_5px_rgba(0,0,0,0.1)] p-2 transform transition-transform duration-300 ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
                <img src={product.images[0]} alt={product.name} className="w-10 h-10 object-contain"/>
                <div>
                    <p className="text-sm font-semibold truncate max-w-[200px] md:max-w-full">{product.name}</p>
                    <p className="text-lg font-semibold">R$ {product.currentPrice.toFixed(2).replace('.', ',')}</p>
                </div>
            </div>
            <a 
              href="https://yZRr.checkout.lunacheckout.com/checkout?product=07b4c2fa-b91b-11f0-a710-46da4690ad53" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-md hover:bg-blue-600 transition-colors flex-shrink-0"
            >
                Comprar agora
            </a>
        </div>
    </div>
);

const Footer: React.FC = () => {
    const footerLinks = {
        'Sobre o': [
            { name: 'Mercado Livre', href: '#' },
            { name: 'Investor relations', href: '#' },
            { name: 'Tendências', href: '#' },
            { name: 'Sustentabilidade', href: '#' },
        ],
        'Outros sites': [
            { name: 'Desenvolvedores', href: '#' },
            { name: 'Mercado Pago', href: '#' },
            { name: 'Mercado Envios', href: '#' },
            { name: 'Mercado Shops', href: '#' },
            { name: 'Mercado Ads', href: '#' },
        ],
        'Contato': [
            { name: 'Comprar', href: '#' },
            { name: 'Vender', href: '#' },
            { name: 'Resolução de problemas', href: '#' },
            { name: 'Segurança', href: '#' },
        ],
        'Redes sociais': [
            { name: 'Twitter', href: '#' },
            { name: 'Facebook', href: '#' },
            { name: 'Instagram', href: '#' },
            { name: 'YouTube', href: '#' },
        ],
        'Minha conta': [
            { name: 'Resumo', href: '#' },
            { name: 'Favoritos', href: '#' },
            { name: 'Vender grátis', href: '#' },
            { name: 'Assinaturas', href: '#' },
        ],
    };

    const bottomLinks = [
        { name: 'Trabalhe conosco', href: '#' },
        { name: 'Termos e condições', href: '#' },
        { name: 'Como cuidamos da sua privacidade', href: '#' },
        { name: 'Acessibilidade', href: '#' },
        { name: 'Contato', href: '#' },
        { name: 'Informações sobre seguros', href: '#' },
    ];

    return (
        <footer className="bg-white py-10 border-t">
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-sm">
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title}>
                            <h3 className="font-bold text-gray-800 mb-4">{title}</h3>
                            <ul className="space-y-3">
                                {links.map(link => (
                                    <li key={link.name}>
                                        <a href={link.href} className="text-gray-600 hover:text-blue-500">{link.name}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <hr className="my-8 border-gray-200" />
                <div className="flex flex-wrap items-center justify-start gap-x-6 gap-y-2 text-xs text-gray-600">
                    {bottomLinks.map(link => (
                        <a key={link.name} href={link.href} className="hover:text-blue-500">{link.name}</a>
                    ))}
                </div>
            </div>
        </footer>
    );
};


// --- MAIN APP ---
const App: React.FC = () => {
    const [isStickyVisible, setIsStickyVisible] = useState(false);
    const buyButtonRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // When the button is NOT intersecting (i.e., scrolled out of view), show sticky bar
                setIsStickyVisible(!entry.isIntersecting && window.scrollY > 200);
            },
            { rootMargin: "0px", threshold: 0 }
        );

        const currentRef = buyButtonRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <Header />
      <main className="max-w-6xl mx-auto p-2 sm:p-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="hidden md:block">
                <Breadcrumbs crumbs={productData.breadcrumbs} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
                <div className="lg:col-span-6">
                    <ProductGallery images={productData.images} />
                </div>
                <div className="lg:col-span-4">
                    <ProductInfo product={productData} buyButtonRef={buyButtonRef} />
                </div>
            </div>
        </div>
        
        <SellerProducts products={productData.sellerProducts} />
        <ProductKnowledge highlights={productData.highlights} />
        <ProductCharacteristics characteristics={productData.characteristics} />
        <StoreInfoSection storeInfo={productData.storeInfo} />
        <ProductDescription description={productData.description} />
        <Reviews product={productData} />
        <RelatedProducts products={productData.relatedProducts} />
      </main>
      <Footer />
      <StickyBuyBar product={productData} isVisible={isStickyVisible} />
      <div className="h-24"></div> {/* Spacer for bottom content */}
    </div>
  );
}

export default App;
