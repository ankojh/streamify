import { useState } from "react";

type Props = {
  title: string;
  options: { label: string; value: string }[];
  selectedOption: string[];
  onSelectionChange: (value: string[]) => void;
};

export function Dropdown({
  title,
  options,
  selectedOption,
  onSelectionChange,
}: Props) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="relative inline-block text-left mb-4">
      <div>
        <button
          type="button"
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          id="menu-button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          {title}
          <svg
            className="-mr-1 h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            data-slot="icon"
          >
            <path
              fill-rule="evenodd"
              d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isDropdownOpen && (
        <div
          className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div className="py-1" role="none">
            {options.map((option) => (
              <a
                key={option.value}
                href="#"
                className={
                  "block px-4 py-2 text-sm text-gray-700" +
                  (selectedOption.includes(option.value)
                    ? " bg-gray-100 text-gray-900"
                    : "")
                }
                role="menuitem"
                id="menu-item-0"
                onClick={() => {
                  if (selectedOption.includes(option.value)) {
                    const findIndex = selectedOption.indexOf(option.value);
                    onSelectionChange(
                      selectedOption.filter((_, index) => index !== findIndex)
                    );
                  } else {
                    onSelectionChange([...selectedOption, option.value]);
                  }
                }}
              >
                {option.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
