interface LinkItem {
  name: string
  url: string
}

const list: LinkItem[] = [
  {
    name: 'Apple (台灣)',
    url: 'https://www.apple.com/tw/',
  },
  {
    name: 'Timeline of iPhone models - 維基百科',
    url: 'https://zh.wikipedia.org/wiki/Template:Timeline_of_iPhone_models',
  },
  {
    name: '中華民國基本工資 - 維基百科',
    url: 'https://zh.wikipedia.org/zh-tw/%E4%B8%AD%E8%8F%AF%E6%B0%91%E5%9C%8B%E5%9F%BA%E6%9C%AC%E5%B7%A5%E8%B3%87',
  },
]

export function DataSource() {
  return (
    <div className="">
      <h2 className="pb-4 font-semibold">資料來源</h2>

      <ol className="flex list-decimal flex-col gap-2 pl-5 text-sm">
        {list.map((item, index) => (
          <li key={index}>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              {item.name}
            </a>
          </li>
        ))}
      </ol>
    </div>
  )
}
