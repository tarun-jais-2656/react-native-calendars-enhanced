interface CustomModalProps {
    isVisible: boolean;
    onClose: () => void;
    data: string[];
    onSelect: (item: string) => void;
    dataType: string
    currentItem: Record<string, any>;
}