export default function Footer() {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-gray-600">
          &copy; {new Date().getFullYear()} Dexter Fort Silva. All rights
          reserved.
        </p>
        <p className="text-gray-600">
          Web Development 2 Project - Visualizing Country Information
        </p>
      </div>
    </footer>
  );
}
