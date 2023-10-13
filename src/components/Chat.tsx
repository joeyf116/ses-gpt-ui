import { useEffect, useRef, useState } from "react";
import { FiSend } from "react-icons/fi";
import { BsChevronDown, BsPlusLg } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import useAutoResizeTextArea from "@/hooks/useAutoResizeTextArea";
import Message from "./Message";
import { DEFAULT_OPENAI_MODEL } from "@/shared/Constants";
import Image from "next/image";
import { useChat } from "ai/react";

const Chat = (props: any) => {
	const { toggleComponentVisibility } = props;

	const { input, handleInputChange, handleSubmit, isLoading, messages } =
		useChat();

	const [errorMessage, setErrorMessage] = useState("");
	const textAreaRef = useAutoResizeTextArea();
	const bottomOfChatRef = useRef<HTMLDivElement>(null);

	const selectedModel = DEFAULT_OPENAI_MODEL;

	useEffect(() => {
		if (textAreaRef.current) {
			textAreaRef.current.style.height = "24px";
			textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
		}
	}, [input, textAreaRef]);

	useEffect(() => {
		if (bottomOfChatRef.current) {
			bottomOfChatRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [messages]);

	return (
		<div className="flex max-w-full flex-1 flex-col">
			<div className="sticky top-0 z-10 flex items-center border-b border-white/20 bg-gray-800 pl-1 pt-1 text-gray-200 sm:pl-3 md:hidden">
				<button
					type="button"
					className="-ml-0.5 -mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-md hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white dark:hover:text-white"
					onClick={toggleComponentVisibility}
				>
					<span className="sr-only">Open sidebar</span>
					<RxHamburgerMenu className="h-6 w-6 text-white" />
				</button>
				<h1 className="flex-1 text-center text-base font-normal">New chat</h1>
				<button type="button" className="px-3">
					<BsPlusLg className="h-6 w-6" />
				</button>
			</div>
			<div className="relative h-full w-full transition-width flex flex-col overflow-hidden items-stretch flex-1">
				<div className="flex-1 overflow-hidden">
					<div className="react-scroll-to-bottom--css-ikyem-79elbk h-full dark:bg-gray-800">
						<div className="react-scroll-to-bottom--css-ikyem-1n7m0yu">
							{messages.length > 0 ? (
								<div className="flex flex-col items-center text-sm bg-gray-800">
									<div className="flex w-full items-center justify-center gap-1 border-b border-black/10 bg-gray-50 p-3 text-gray-500 dark:border-gray-900/50 dark:bg-gray-700 dark:text-gray-300">
										Model: {selectedModel.name}
									</div>
									{messages.map((message, index) => (
										<Message key={index} message={message} />
									))}
									<div className="w-full h-32 md:h-48 flex-shrink-0"></div>
									<div ref={bottomOfChatRef}></div>
								</div>
							) : null}
							{messages.length === 0 ? (
								<div className="py-10 relative w-full flex flex-col h-full">
									<div className="flex items-center justify-center gap-2"></div>
									<div className="flex flex-col h-[100dvh] justify-center space-y-2 align-middle items-center">
										<Image
											src="/MultiColorS_48.png"
											width={100}
											height={100}
											alt="Picture of the author"
											className="shadow-full"
										/>
										<h1 className="text-2xl sm:text-4xl font-semibold text-gray-200 dark:text-gray-600">
											SES | GPT
										</h1>
									</div>
								</div>
							) : null}
							<div className="flex flex-col items-center text-sm dark:bg-gray-800"></div>
						</div>
					</div>
				</div>
				<div className="absolute bottom-0 left-0 w-full border-t md:border-t-0 dark:border-white/20 md:border-transparent md:dark:border-transparent md:bg-vert-light-gradient bg-white dark:bg-gray-800 md:!bg-transparent dark:md:bg-vert-dark-gradient pt-2">
					<form
						className="stretch mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl"
						onSubmit={handleSubmit}
					>
						<div className="relative flex flex-col h-full flex-1 items-stretch md:flex-col">
							{errorMessage ? (
								<div className="mb-2 md:mb-0">
									<div className="h-full flex ml-1 md:w-full md:m-auto md:mb-2 gap-0 md:gap-2 justify-center">
										<span className="text-red-500 text-sm">{errorMessage}</span>
									</div>
								</div>
							) : null}
							<div className="flex flex-col w-full py-2 flex-grow md:py-3 md:pl-4 relative border border-black/10 bg-white dark:border-gray-900/50 dark:text-white dark:bg-gray-700 rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:shadow-[0_0_15px_rgba(0,0,0,0.10)]">
								<textarea
									ref={textAreaRef}
									value={input}
									data-id="root"
									style={{
										height: "24px",
										maxHeight: "200px",
										overflowY: "hidden",
									}}
									// rows={1}
									placeholder="Send a message..."
									className="m-0 w-full resize-none border-0 bg-transparent p-0 pr-7 focus:ring-0 focus-visible:ring-0 dark:bg-transparent pl-2 md:pl-0"
									onChange={handleInputChange}
								></textarea>
								<button
									type="submit"
									tabIndex={0}
									disabled={isLoading || input?.length === 0}
									className="absolute p-1 rounded-md bottom-1.5 md:bottom-2.5 bg-transparent disabled:bg-gray-500 right-1 md:right-2 disabled:opacity-40"
								>
									<FiSend className="h-4 w-4 mr-1 text-white " />
								</button>
							</div>
						</div>
					</form>
					<div className="px-3 pt-2 pb-3 text-center text-xs text-black/50 dark:text-white/50 md:px-4 md:pt-3 md:pb-6">
						<span>
							ChatGPT Clone may produce inaccurate information about people,
							places, or facts.
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Chat;
