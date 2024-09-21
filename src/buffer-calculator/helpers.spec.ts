import { describe, expect, it } from "vitest";
import { formatThousands, toNumber } from "./helpers";

describe("formatThousands", () => {
	it("should reformat a number to have dots every 3 digits", () => {
		expect(formatThousands("€ 123456789")).toBe("€ 123.456.789");
		expect(formatThousands("€ 12345678")).toBe("€ 12.345.678");
		expect(formatThousands("€ 123")).toBe("€ 123");
		expect(formatThousands("€ 12")).toBe("€ 12");
	});

	it("should handle empty strings", () => {
		expect(formatThousands("")).toBe("€ ");
		expect(formatThousands("€ ")).toBe("€ ");
		expect(formatThousands("€")).toBe("€ ");
	});

	it("should remove non-numeric characters", () => {
		expect(formatThousands("12.34a")).toBe("€ 1.234");
	});
});

describe("toNumber", () => {
	it("should convert a string to a number", () => {
		expect(toNumber("123")).toBe(123);
	});
	it("should convert a string with dots to a number", () => {
		expect(toNumber("123.456")).toBe(123456);
		expect(toNumber("13.456.789")).toBe(13456789);
	});
	it("should handle empty strings", () => {
		expect(toNumber("")).toBe(0);
	});
	it("should remove non-numeric characters", () => {
		expect(toNumber("12.34a")).toBe(1234);
		expect(toNumber("€ 123.456.7")).toBe(1234567);
	});
	it("should handle undefined", () => {
		expect(toNumber(undefined as unknown as string)).toBe(0);
	});
});
