import React from "react";

export class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError() {
		return { hasError: true };
	}

	componentDidCatch(error, info) {
		console.error("Error caught in boundary:", error, info.componentStack);
	}

	render() {
		if (this.state.hasError) {
			return this.props.fallback || <p>Something went wrong.</p>;
		}
		return this.props.children;
	}
}
