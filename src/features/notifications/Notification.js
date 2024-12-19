import React from 'react'

const Notification = () => {


    return (
        <div class="flex flex-col justify-center items-center bg-white">
            <div
                class="mx-auto flex w-full flex-col justify-center px-5 pt-0 md:h-[unset] max-w-[520px] lg:px-6 xl:pl-0"
            >
                <div class="relative flex w-full flex-col pt-[1px] md:pt-0">
                    <div
                        class="rounded-lg border bg-card text-card-foreground shadow-sm mb-5 mr-0 h-min max-w-full pt-8 pb-6 px-6 dark:border-zinc-800 md:mb-0"
                    >
                        <div>
                            {/* <p
                                class="text-xl font-extrabold text-zinc-950 dark:text-white md:text-3xl"
                            >
                                Notifications
                            </p> */}
                            <p
                                class="mb-5 text-sm font-medium text-zinc-500 dark:text-zinc-400 md:mt-4 md:text-base"
                            >
                                You have 3 unread messages.
                            </p>
                        </div>
                        <div
                            class="relative mx-auto flex w-full max-w-full md:pt-[unset] mb-6"
                        >
                            <div class="w-2 h-2 mt-1 me-4 rounded-full bg-blue-500"></div>
                            <div>
                                <p class="text-zinc-950 dark:text-white font-medium mb-1">
                                    You have new table reservation.
                                </p>
                                <p class="text-zinc-500 dark:text-zinc-400 font-medium">
                                    1 hour ago
                                </p>
                            </div>
                        </div>
                        <div
                            class="relative mx-auto flex w-full max-w-full md:pt-[unset] mb-6"
                        >
                            <div class="w-2 h-2 mt-1 me-4 rounded-full bg-blue-500"></div>
                            <div>
                                <p class="text-zinc-950 dark:text-white font-medium mb-1">
                                    You have a new Online Order!
                                </p>
                                <p class="text-zinc-500 dark:text-zinc-400 font-medium">
                                    1 hour ago
                                </p>
                            </div>
                        </div>
                        <div class="relative mx-auto flex w-full max-w-full md:pt-[unset]">
                            <div class="w-2 h-2 mt-1 me-4 rounded-full bg-blue-500"></div>
                            <div>
                                <p class="text-zinc-950 dark:text-white font-medium mb-1">
                                    You have new subscription!
                                </p>
                                <p class="text-zinc-500 dark:text-zinc-400 font-medium">
                                    2 hours ago
                                </p>
                            </div>
                        </div>
                        <button
                            class="whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 flex w-full max-w-full mt-6 items-center justify-center rounded-lg px-4 py-4 text-base font-medium"
                        >
                            <svg
                                stroke="currentColor"
                                fill="none"
                                stroke-width="2"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                                class="me-2 h-6 w-6"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                            Mark all as read
                        </button>
                        <div
                            class="rounded-lg border bg-card text-card-foreground shadow-sm mb-5 h-min flex items-center max-w-full py-4 px-4 dark:border-zinc-800"
                        >
                            <svg
                                stroke="currentColor"
                                fill="none"
                                stroke-width="1.5"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                                class="w-6 h-6 me-4"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
                                ></path>
                            </svg>
                            <div>
                                <p class="text-zinc-950 dark:text-white font-medium mb-1">
                                    Push Notifications to all Customers
                                </p>
                                <p class="text-zinc-500 dark:text-zinc-400 font-medium">
                                    Send notifications to device.
                                </p>
                            </div>
                            <button
                                type="button"
                                role="switch"
                                aria-checked="true"
                                data-state="checked"
                                value="on"
                                class="peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input ms-auto"
                            >
                                <span
                                    data-state="checked"
                                    class="pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
                                ></span>
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
}

export default Notification